<template>
    <div>
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
    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
export default {
    data() {
        return {
            content: null,
            address: null,
            formatted_address: null,
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
        }
    },

    async mounted() {
    await this.getCurrentPosition()
        .then((res) => {
            const currentPos = {
            lat: res.coords.latitude,
            lng: res.coords.longitude,
            }
            const geocoder = new google.maps.Geocoder()
            const searchlatlng = geocoder.geocode({location: currentPos})
            console.log(searchlatlng)
            console.log(searchlatlng.results[0].formatted_address)
            this.formatted_address = searchlatlng.results[0].formatted_address
            this.maplocation = currentPos
            this.markers.push({title:searchlatlng.results[0].formatted_address,position: {lat: this.maplocation.lat, lng: this.maplocation.lng}})
            this.flash(
                {
                    message: "現在の位置情報を表示しています。",
                    type: "sucess",
                    status: true,
                },
                    { root: true } // 他のvuexモジュールから呼び出すときにつける
            )
        })
        .catch(() => {
            this.flash(
                {
                    message: "現在の位置を取得できませんでした。",
                    type: "sucess",
                    status: true,
                },
                    { root: true } // 他のvuexモジュールから呼び出すときにつける
            )
        })
    },

    methods: {
        ...mapActions({
      setLoading: 'modules/info/setLoading',
      setFlash: 'modules/info/setFlash',
      flash: 'modules/flash/showMessage',
    }),

    getCurrentPosition() {
      return new Promise(function (resolve, reject) {
        navigator.geolocation.getCurrentPosition(resolve, reject)
        console.log(resolve)
      })
    },

    onClickMarker(index, marker) {
      this.$refs.gmp.panTo(marker.position)
      this.infoWindowPos = marker.position
      this.marker = marker
      this.infoWinOpen = true
    },

    }

}
</script>