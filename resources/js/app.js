

require('./bootstrap');

window.Vue = require('vue').default;


Vue.component('example-component', require('./components/ExampleComponent.vue').default);

import axios from 'axios';

//import google map
import * as VueGoogleMaps from 'vue2-google-maps';


Vue.use(VueGoogleMaps, {
    load: {
        key:process.env.MIX_GOOGLE_MAP_APIKEY
    },
    //installComponents: true,
});

// Vue.component('google-maps-map', VueGoogleMaps.Map);
// Vue.component('google-maps-marker', VueGoogleMaps.Marker);

const app = new Vue({
    el: '#app',
    data() {
        return {
            resturants: [],
            infoWindowOptions: {
                pixelOffset : {
                    width: 0,
                    height: -35
                }
            },
            activeResturant: {},
            infoWindowOpened: false
        }
    },

    created() {
        axios.get('/api/resturants')
            .then((response) => this.resturants = response.data)
            .catch((errors) => console.error(errors));
    },

    // mounted() {
    //     console.log(process.env.MIX_GOOGLE_MAP_APIKEY);
    //   },

    methods: {
        getPosition(r) {
            return{
                lat: parseFloat(r.latitude),
                lng: parseFloat(r.longitude)
            }
        },

        handleMarkerClicked(r) {
            this.activeResturant = r;
            this.infoWindowOpened = true;
        }, 

        handleInfoWindowClose() {
            this.activeResturant = {},
            this.infoWindowOpened = false;
        },

        handleMapClick(e) {
            this.resturants.push({
                name: "Placeholder",
                hours: "00:00am - 00:00pm",
                city: "Georgia",
                State: "GA",
                latitude: e.latLng.lat(),
                longitude: e.latLng.lng()

            });

            axios.post('/api/resturants/create', {
                latitude: e.latLng.lat(),
                longitude: e.latLng.lng()
            })
        }
    },

    computed: {
        mapCenter() {
            if(!this.resturants.length) {
                return {
                    lat : 10,
                    lng : 10
                }
            }

            return {
                lat: parseFloat(this.resturants[0].latitude),
                lng: parseFloat(this.resturants[0].longitude)
            }
        },

        infoWindowPosition() {
            return {
                lat: parseFloat(this.activeResturant.latitude),
                lng: parseFloat(this.activeResturant.longitude)
            }
        },
    }

});
