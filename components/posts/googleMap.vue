<template>
    <div>
        <v-row justify="center" align="center">
            <v-col cols="12" sm="8" md="6">
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
            </v-col>
        </v-row>
    </div>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from 'vuex'

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
    }
}
</script>