<template>
  <div>
    <ValidationObserver
      v-slot="{ invalid }"
    >
      <v-form>
        <p v-if="error" class="errors">{{ error }}</p>
        <TextFieldWithValidation
          v-model="title"
          label="タイトル"
          rules="max:20|required"
        />
        </v-form>
    </ValidationObserver>

    <ValidationObserver
      v-slot="{ invalid }"
    >
      <v-form>
        <p v-if="error" class="errors">{{ error }}</p>
        <TextFieldWithValidationPost
          v-model="content"
          label="内容"
          rules="max:255|required"
        />
        </v-form>
    </ValidationObserver>   
    <v-row justify="center" align="center">
      <v-col cols="12" sm="8" md="6">
        <div class="text-center">
          </div>
            <v-card>
              <GmapMap
                ref="gmp"
                map-type-id="roadmap"
                :center="maplocation"
                :zoom="zoom"
                :style="styleMap"
                :options="mapOptions"
              >
                <GmapMarker
                  v-for="(m, index) in markers"
                  :key="index"
                  :title="m.title"
                  :position="m.position"
                  :clickable="true"
                  :draggable="false"
                  @click="onClickMarker(index, m)"
                />
                <GmapInfoWindow
                  :options="infoOptions"
                  :position="infoWindowPos"
                  :opened="infoWinOpen"
                  @closeclick="infoWinOpen = false"
                >
                  <p style="color: #000">
                    {{ marker.title }}
                  </p>
                </GmapInfoWindow>
              </GmapMap>
            </v-card>
          <ValidationObserver
            v-slot="{ invalid }"
          >
            <v-form>
              <p v-if="error" class="errors">{{ error }}</p>
              <TextFieldWithValidation
                v-model="formatted_address"
                label="住所を入力"
                rules="max:100|required"
              />
              <v-btn
                color="success"
                class="mx-auto white--text mt-4"
                :disabled="invalid"
                @click="moveAddress"
                >座標表示
              </v-btn>
            </v-form>
          </ValidationObserver>
          </v-col>
        </v-row>
    <input @change="onFileChange" type="file">
    <p>画像は必須です！</p>
    <v-btn @click='console()'>console</v-btn>
    <v-btn @click='post()'>投稿</v-btn>
  </div>
</template>


<script>
import { mapActions, mapGetters } from 'vuex'
import TextFieldWithValidationPost from '~/components/posts/TextFieldWithValidation.vue'
import TextFieldWithValidation from '~/components/TextFieldWithValidation.vue'

export default {
    data() {
        return {
          title: null,
          content: null,
          formatted_address: null,
          error: null,
          images: [],
          maplocation: { lng: 0, lat: 0 },
          zoom: 4,
          styleMap: {
             width: '100%',
            height: '400px',
          },
          mapOptions: {
            streetViewControl: false,
            styles: [],
          },
          infoOptions: {
            minWidth: 200,
            pixelOffset: {
              width: 0,
              height: -35,
            },
          },
          infoWindowPos: null,
          infoWinOpen: false,
          marker: {},
          markers: [],
          x: null,
          currentPos: {}
        }
    },

    components: {
      TextFieldWithValidation,
      TextFieldWithValidationPost
    },

    async mounted() {
      const currentPosTmp = await this.getCurrentPosition()
      console.log(currentPosTmp)
      if (currentPosTmp !== undefined) {
      this.currentPos = {
        lat: currentPosTmp.coords.latitude,
        lng: currentPosTmp.coords.longitude,
      }
      const geocoder = await new google.maps.Geocoder()
      const searchLatLng = await geocoder.geocode({location: this.currentPos})
      console.log(searchLatLng.results[0].formatted_address)
      this.formatted_address = searchLatLng.results[0].formatted_address
      this.maplocation = this.currentPos
      this.markers.push({title:searchLatLng.results[0].formatted_address,position: {lat: this.maplocation.lat, lng: this.maplocation.lng}})
      this.flash(
        {
          message: "現在の位置情報を表示しています。",
          type: "sucess",
          status: true,
        },
          { root: true } // 他のvuexモジュールから呼び出すときにつける
      )
      }else {
        this.flash(
        {
          message: "現在の位置情報を取得できませんでした。位置情報を許可してください。",
          type: "sucess",
          status: true,
        },
          { root: true } // 他のvuexモジュールから呼び出すときにつける
      )
      }
      
    },

    computed: {
    ...mapGetters({
      currentUser: 'modules/user/data',
      otherUser: 'modules/otherUser/data',
    }),
    },

  methods: {
    ...mapActions({
      setLoading: 'modules/info/setLoading',
      setFlash: 'modules/info/setFlash',
      flash: 'modules/flash/showMessage',
    }),
    getCurrentPosition() {
      return new Promise(function (resolve, reject) {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(resolve, reject)
          console.log(resolve)
          console.log("この端末では位置情報が取得できます")
        } else {
          console.log("この端末では位置情報が取得できません1");
        }
      }).then((res) => {
        console.log(res)
        return res
      }).catch((error) => {
        console.log(error)
      })
    },

    onClickMarker(index, marker) {
      this.$refs.gmp.panTo(marker.position)
      this.infoWindowPos = marker.position
      this.marker = marker
      this.infoWinOpen = true
    },

    async moveAddress() {
      this.markers.pop()
      console.log('start')
      const geocoder = new google.maps.Geocoder()
      const searchlatlng = await geocoder.geocode({address: this.formatted_address})
      const resultlatlng = {
        lat: searchlatlng.results[0].geometry.location.lat(),
        lng: searchlatlng.results[0].geometry.location.lng(),
      }
        this.formatted_address = searchlatlng.results[0].formatted_address
        console.log(this.formatted_address)
        this.maplocation = resultlatlng
        console.log(searchlatlng)
        console.log(resultlatlng)
        this.markers.push({title:this.address,position: {lat: this.maplocation.lat, lng: this.maplocation.lng}})
    },    
    onFileChange(e){
      var files = e.target.files || e.dataTransfer.files;
      this.createImage(files[0])
            
    },
    createImage(file) {
      var reader = new FileReader()
      var vm = this
      var obj = {}
      reader.onload = function(e) {
        obj.thumnail = e.target.result
        obj.uploadFile = file
        obj.name = file.name
        vm.images.push(obj)
      }
      reader.readAsDataURL(file)
      console.log(this.images)
    },
    async post() {
        if (this.content != null) {
          if (this.images.length != 0) {
          var formData = new FormData()
          for (var i = 0; i < this.images.length; i++) {
            formData.append('images[]', this.images[i].uploadFile)
          }
          formData.append('post[title]',this.title)
          formData.append('post[content]',this.content)
          formData.append('post[user_id]',this.currentUser.id)
          formData.append('post[uid]',this.$store.state.modules.user.user.uid)
          formData.append('post[latitude]',this.maplocation.lat)
          formData.append('post[longitude]',this.maplocation.lng)
          formData.append('post[formatted_address]',this.formatted_address)
          const config = {
            headers: {
              'content-type': 'multipart/form-data'
            }
          }
          await this.$axios.$post('http://localhost:3000/api/v1/posts', formData,config)
            .then(res => {
              console.log(res)
              console.log(5)
              this.avatar_url = res.avatar_url
              console.log(this.avatar_url)
              this.flash(
                {
                  message: "投稿しました。",
                  type: "sucess",
                  status: true,
                },
                  { root: true } // 他のvuexモジュールから呼び出すときにつける
              )
            })
            .catch(err => {
              console.log(this.err)
            })
        }else {
          // alert('画像は必須です！')
          this.flash(
        {
          message: "画像は必須です！",
          type: "sucess",
          status: true,
        },
          { root: true } // 他のvuexモジュールから呼び出すときにつける
      )
        }
        }else {
          // alert('投稿内容がありません。')
          this.flash(
        {
          message: "投稿内容がありません。",
          type: "sucess",
          status: true,
        },
          { root: true } // 他のvuexモジュールから呼び出すときにつける
      )
        }
    },
    console() {
      console.log(this.images)
      console.log(this.address)
      console.log(this.formatted_address)
    }
  }
  

  


}
</script>

