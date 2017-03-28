import React from 'react';
import GoogleApiComponent from '../lib/GoogleApiComponent';
import Map from '../components/Map';
const __GAPI_KEY__ = 'AIzaSyAyesbQMyKVVbBgKVi2g6VX7mop2z96jBo';

export class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            pos: {
                lat: '12.12312',
                lng: '-12.34234'
            }
        }

        this.handleLatBlur = this.handleLatBlur.bind(this);
        this.handleLngBlur = this.handleLngBlur.bind(this);
        this.handleDragend = this.handleDragend.bind(this);
        this.handleLatChange = this.handleLatChange.bind(this);
        this.handleLngChange = this.handleLngChange.bind(this);
    }

    componentDidMount() {
        if(navigator && navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(pos => {
                const coords = pos.coords;
                
                this.setState({
                    pos: {
                        lat: coords.latitude,
                        lng: coords.longitude
                    }
                })
            })
        }
    }
    handleDragend(map) {
        const lat = map.center.lat();
        const lng = map.center.lng();
        const pos = {
            lat,
            lng
        };
        this.setState({
            pos: {
                lat,
                lng
            }
        });
    }

    render() {
        const {pos} = this.state;
        console.log('rendered')
        return(
            <div>
                <Map google={this.props.google} pos={this.state.pos} onDragend={this.handleDragend}/>
                <hr/>
                <input type="text" />
                <hr/>
                <p>lat: </p>
                <input type="text" value={this.state.pos.lat} onChange={this.handleLatChange} onBlur={this.handleLatBlur}/>
                <p>lng: </p>
                <input type="text" value={pos.lng} onChange={this.handleLngChange} onBlur={this.handleLngBlur}/>
            </div>
        );
    }

    handleLatChange(e) {
        const value = e.target.value;
        this.setState({
            pos:{
                lat: value,
                lng: this.state.pos.lng
            }
        })
    }

    handleLngChange(e) {
        const value = e.target.value;
        console.log(value);
        this.setState({
            pos: {
                lat: this.state.pos.lat,
                lng: value
            }
        })
    }

    handleLatBlur(e) {
        const lat = e.target.value;
        this.setState({
            pos: {
                lat,
                lng: this.state.pos.lng
            }
        });
    }
    handleLngBlur(e) {
        const lng = e.target.value;
        this.setState({
            pos: {
                lat: this.state.pos.lat,
                lng
            }
        });
    }
}

export default GoogleApiComponent({
    apiKey: __GAPI_KEY__
})(App);