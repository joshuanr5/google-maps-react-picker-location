import React from 'react';

class Marker extends React.Component {
    
    componentDidUpdate(prevProps) {
        if ((this.props.map !== prevProps.map) ||
            (JSON.stringify(prevProps.pos) !== JSON.stringify(this.props.pos))) {
                
            this.renderMarker();
        }
    }

    

    renderMarker() {
        let { map, google, pos } = this.props;

        const markerPos = new google.maps.LatLng(pos.lat, pos.lng);
        const pref = {
            map: map,
            position: markerPos,
            draggable: true
        };
        this.marker = new google.maps.Marker(pref);


    }

    render() {
        return null;
    }
}

export default Marker;