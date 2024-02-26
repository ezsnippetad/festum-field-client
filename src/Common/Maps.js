import GoogleMapReact from "google-map-react";
import { GoogleApiWrapper } from "google-maps-react";
import React, { Component, useState } from "react";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from "react-places-autocomplete";
import { useDispatch } from "react-redux";
import { friendRequestsSend } from "../redux/Slice/requestSlice";
import { Secondary } from "../redux/services/toastServices";
import { toast } from "react-toastify";
const AnyReactComponent = ({ image, name, id, countId, setCountOpenPop }) => {
  const [sendReq, setSendReq] = useState(false);
  const [msg, setMsg] = useState("");
  const dispatch = useDispatch();
  const FriendsRequestsSent = async () => {
    const payload = {
      receiverid: id,
      message: msg,
    };
    try {
      const response = await dispatch(friendRequestsSend(payload)).unwrap();
      if (response?.data?.IsSuccess && response?.data?.Status == 200) {
        setSendReq(false);
        toast.success(response?.data?.Message)
      }
    } catch (error) {
      console.log(error);
      Secondary("SOMETHING WENT WRONG.");
    }
  };

  // const countArray = () => {
  //   let array = Object.assign([], countOpenPop);
  //   array.push(index);
  //   setCountOpenPop({array});
  // };
  return (
    <>
      <div
        className="h-[70px] w-[70px] bg-white rounded-full shadow-sm relative"
        onClick={() => {
          setCountOpenPop(id);
          setSendReq(!sendReq);
        }}
      >
        {image === "" ? (
          <div className="w-full h-full flex justify-center items-center icon-user text-2xl rounded-full text-chatlook-gray z-50" />
        ) : (
          <img
            className="h-[70px] w-[70px] p-1 bg-white rounded-full shadow-sm z-50"
            src={`https://festumfield.s3.ap-south-1.amazonaws.com/${image}`}
          />
        )}
        <div
          className="
  border-l-[15px] border-l-transparent
  border-t-[15px] border-white
  border-r-[15px] border-r-transparent absolute transform w-4 h-4 left-[20px] bottom-[-12px] z-0"
        />
      </div>
      {countId === id && sendReq && (
        <div className="h-[146px] w-[200px] bg-white absolute rounded-md top-[86px] left-[-65px] p-3 z-50">
          <h3 className="capitalize">{name}</h3>
          <div className="w-full h-[50px] pt-1">
            <textarea
              name="description"
              className="w-full h-full bg-chatlook-grayLight px-2 py-3 rounded-md  font-medium resize-none focus-visible:outline-none"
              placeholder="Type Message Here..."
              onChange={(e) => setMsg(e.target.value)}
            ></textarea>
          </div>
          <div className="w-full mt-3 h-9">
            <button
              className="w-full h-full max-w-[250px] block bg-chatlook-sky text-white uppercase rounded-md py-1 text-xs font-medium"
              onClick={() => FriendsRequestsSent()}
            >
              send request
            </button>
          </div>
        </div>
      )}
    </>
  );
};
export class Maps extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // address: "",
      showingInfoWindow: false,
      activeMarker: {},
      selectedPlace: {},
      mapCenter: {
        lng: this.props.longitude,
        lat: this.props.latitude,
      },
      countOpenPop: null,
    };
  }
  handleClick = (address, lng, lat) => { };
  handleChange = (address) => {
    // setAddressLength(address)
    this.setState({ address });
  };

  setCountOpenPop = (id) => {
    this.setState({ countOpenPop: id });
  };

  handleSelect = (address) => {
    this.props.searchingChange(address);
    this.setState({ address });
    geocodeByAddress(address)
      .then((results) => getLatLng(results[0]))
      .then((latLng) => {
        // update center state
        this.setState({ mapCenter: latLng });
        this.props.latLngChange(latLng);
        (
          this.props.handleClick(
            this.state.address,
            latLng.lng,
            latLng.lat,
            latLng
          )
        );
      })
      .catch((error) => console.error("Error", error));
  };
  componentDidMount() {
    navigator.geolocation.getCurrentPosition(
      function (position) {
        console.log(position);
      },
      function (error) {
        console.error("Error Code = " + error.code + " - " + error.message);
      }
    );
  }
  render() {
    return (
      <PlacesAutocomplete
        value={this.state.address}
        onChange={this.handleChange}
        onSelect={(address) => {
          this.handleSelect(address);
        }}
      >
        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
          <div className="mapBox relative w-full h-full">
            {this.props.search ? (
              <>
                <div className="map_Search_area flex space-x-2 items-center py-3 px-4 bg-chatlook-grayLight rounded absolute max-w-xs w-full right-20 -top-16 z-50">
                  <span className="icon-search text-base"></span>
                  <input
                    {...getInputProps({
                      placeholder: "Search Places ...",
                      className:
                        "location-search-input top-0 left-0 w-full z-10",
                    })}
                  />
                </div>
              </>
            ) : null}
            <div className="autocomplete-dropdown-container absolute top-0 right-0 max-w-sm w-full bg-white z-10 px-3">
              {loading && <div>Loading...</div>}
              {suggestions.map((suggestion) => {
                const className = suggestion.active
                  ? "suggestion-item--active"
                  : "suggestion-item";
                // inline style for demonstration purpose
                const style = suggestion.active
                  ? { backgroundColor: "#DFDFDF", cursor: "pointer" }
                  : { backgroundColor: "#ffffff", cursor: "pointer" };
                return (
                  <div
                    {...getSuggestionItemProps(suggestion, {
                      className,
                      style,
                    })}

                  >
                    <span className="text-black" >{suggestion.description}</span>
                  </div>
                );
              })}
            </div>

            <div style={this.props.styleHeight}>
              <GoogleMapReact
                bootstrapURLKeys={{
                  key: "AIzaSyAy1EmmZYXtEjbDPvV7gIW0Qs2oD6WKi2o",
                }}
                style={this.props.styles}
                // className="static"
                // defaultCenter={{ lat: 21.1702, lng: 72.8311 }}
                center={
                  this.state.mapCenter
                    ? this.state.mapCenter
                    : { lat: 21.1702, lng: 72.8311 }
                }
                defaultZoom={10}
                yesIWantToUseGoogleMapApiInternals
                onGoogleApiLoaded={({ map, maps }) =>
                  this.props.loadMap(map, maps)
                }
              >
                {this.props.listingPins?.map((val, index) => {

                  return (
                    <AnyReactComponent
                      lat={val.location.coordinates[1]}
                      lng={val.location.coordinates[0]}
                      image={val.profileimage}
                      name={val.fullName}
                      id={val._id}
                      countId={this.state.countOpenPop}
                      setCountOpenPop={this.setCountOpenPop}
                      index={index}
                    />
                  );
                })}
              </GoogleMapReact>
            </div>
          </div>
        )}
      </PlacesAutocomplete>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: "AIzaSyAy1EmmZYXtEjbDPvV7gIW0Qs2oD6WKi2o",
})(Maps);
