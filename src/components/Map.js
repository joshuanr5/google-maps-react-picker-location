import React from 'react';
import ReactDOM from 'react-dom';

class Map extends React.Component {
    constructor(props) {
        super(props);
        this.initialLocation = {
            lat: '12',
            lng: '13'
        };
    }
    componentDidUpdate(prevProps, prevState) {
        if(prevProps.google !== this.props.google) {
            this.loadMap();
            this.props.onInit(this.initialLocation);
        }
        if(JSON.stringify(prevProps.pos) !== JSON.stringify(this.props.pos)) {
            this.loadMap();
        }
            console.log('234234234')
            this.recenterMap();
    }
    componentDidMount() {
        if (navigator && navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(pos => {
                const coords = pos.coords;
                const lat = coords.latitude.toString();
                const lng = coords.longitude.toString();
                this.initialLocation = {
                    lat,
                    lng
                }
            })
        }
        this.loadMap();
    }

    recenterMap() {
        console.log('ag?')
        const map = this.map;
        const curr = this.initialLocation;

        const google = this.props.google;
        const maps = google.maps;

        if (map) {
            let center = new maps.LatLng(curr.lat, curr.lng);
            map.panTo(center);
        }

    }



    loadMap() {
        if(this.props && this.props.google) {
            const {google} = this.props;
            const maps = google.maps;

            const mapRef = this.refs.map;
            const node = ReactDOM.findDOMNode(mapRef);
            let zoom = 14;            
            if(this.map) {
                zoom = this.map.zoom;
            }
            
            
            const { lat, lng } = this.initialLocation;
            const center = new maps.LatLng(lat, lng);
            const mapConfig = Object.assign({}, {
                center: center,
                zoom: zoom
            });
            this.map = new maps.Map(node, mapConfig);

        }
    }

    renderChildren() {
        const {children} = this.props;

        if(!children) return;

        return React.cloneElement(children, {
            map: this.map,
            google: this.props.google,
            pos: this.props.pos
        });
    }

    render() {
        const style = {
            width: '1222px',
            height: '1000px'
        }
        return (
            <div ref='map' style={style}>
                Loading map...
                {this.renderChildren()}
            </div>
        );

    }
}

export default Map;