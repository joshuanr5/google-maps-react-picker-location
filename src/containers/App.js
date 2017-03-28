import React from 'react';
import GoogleApiComponent from '../lib/GoogleApiComponent';
import Map from '../components/Map';
import Marker from '../components/Marker';
const __GAPI_KEY__ = 'AIzaSyAyesbQMyKVVbBgKVi2g6VX7mop2z96jBo';

export class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            pos: {
                lat: '12.12312',
                lng: '-12.34234'
            },
            inputs: {
                lat: '',
                lng: ''
            }
        }

        this.handleLatBlur = this.handleLatBlur.bind(this);
        this.handleLngBlur = this.handleLngBlur.bind(this);
        this.handleDragend = this.handleDragend.bind(this);
        this.handleLatChange = this.handleLatChange.bind(this);
        this.handleLngChange = this.handleLngChange.bind(this);
        this.initialInputs = this.initialInputs.bind(this);
    }

    initialInputs(pos) {
        this.setState({
            pos:{
                lat: pos.lat,
                lng: pos.lng
            },
            inputs: {
                lat: pos.lat,
                lng: pos.lng
            }
        })
    }

    render() {
        const { pos } = this.state;
        const { inputs } = this.state;
        return (
            <div>
                <Map google={this.props.google} onInit={this.initialInputs.bind(null)}>
                    <Marker pos={pos}/>
                </Map>
                <hr />
                <input type="text" />
                <hr />
                <p>lat: </p>
                <input type="text" value={inputs.lat} onChange={this.handleLatChange} onBlur={this.handleLatBlur} />
                <p>lng: </p>
                <input type="text" value={inputs.lng} onChange={this.handleLngChange} onBlur={this.handleLngBlur} />
            </div>
        );
    }

    handleDragend(map) {
        // const lat = map.center.lat();
        // const lng = map.center.lng();
        // this.setState({
        //     inputs: {
        //         lat,
        //         lng
        //     }
        // });
    }

    handleLatChange(e) {
        const value = e.target.value;
        this.setState({
            inputs: { ...this.state.inputs, lat: value }
        })
    }

    handleLngChange(e) {
        const value = e.target.value;
        this.setState({
            inputs: Object.assign({}, this.state.inputs, { lng: value })
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