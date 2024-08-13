import React, { useRef, useState, useEffect } from 'react';
import {
  Box,
  Button,
  ButtonGroup,
  Flex,
  HStack,
  IconButton,
  Input,
  Text,
} from '@chakra-ui/react';
import { FaLocationArrow, FaTimes } from 'react-icons/fa';
import {
  GoogleMap,
  useJsApiLoader,
  Marker,
  DirectionsRenderer,
} from '@react-google-maps/api';

const defaultCenter = { lat: 7.8731, lng: 80.7718 }; // Default coordinates

function Trackingorder() {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries: ['places'],
  });

  const [map, setMap] = useState(null);
  const [directionsResponse, setDirectionsResponse] = useState(null);
  const [distance, setDistance] = useState('');
  const [duration, setDuration] = useState('');
  const originRef = useRef(null);
  const destinationRef = useRef(null);
  const [currentLocation, setCurrentLocation] = useState(null);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        position => {
          const { latitude, longitude } = position.coords;
          setCurrentLocation({ lat: latitude, lng: longitude });
        },
        error => {
          console.error('Error getting current location:', error);
        }
      );
    } else {
      console.error('Geolocation is not supported by this browser.');
    }
  }, []);

  const calculateDistance = async () => {
    if (!originRef.current.value || !destinationRef.current.value) {
      return;
    }

    const origin = originRef.current.value;
    const destination = destinationRef.current.value;

    const service = new window.google.maps.DistanceMatrixService();
    service.getDistanceMatrix(
      {
        origins: [origin],
        destinations: [destination],
        travelMode: 'DRIVING',
      },
      (response, status) => {
        if (status === 'OK') {
          const distance = response.rows[0].elements[0].distance.text;
          const duration = response.rows[0].elements[0].duration.text;
          setDistance(distance);
          setDuration(duration);
        } else {
          console.error('Error calculating distance:', status);
        }
      }
    );
  };

  const getCurrentLocation = () => {
    if (!currentLocation) {
      console.error('Current location not available.');
      return;
    }

    // Do something with currentLocation
    console.log('Current Location:', currentLocation);
  };

  const clearRoute = () => {
    setDirectionsResponse(null);
    setDistance('');
    setDuration('');
    originRef.current.value = '';
    destinationRef.current.value = '';
  };

  return (
    <Flex
      position='relative'
      flexDirection='column'
      alignItems='center'
      h='100vh'
      w='100vw'
    >
      <Box position='absolute' left={0} top={0} h='100%' w='100%'>
        {isLoaded && (
          <GoogleMap
            center={currentLocation || defaultCenter}
            zoom={15}
            mapContainerStyle={{ width: '100%', height: '100%' }}
            options={{
              zoomControl: false,
              streetViewControl: false,
              mapTypeControl: false,
              fullscreenControl: false,
            }}
            onLoad={map => setMap(map)}
          >
            {currentLocation && <Marker position={currentLocation} />}
            {directionsResponse && (
              <DirectionsRenderer directions={directionsResponse} />
            )}
          </GoogleMap>
        )}
      </Box>
      <Box
        p={4}
        borderRadius='lg'
        m={4}
        bgColor='white'
        shadow='base'
        minW='container.md'
        zIndex='1'
      >
        <HStack spacing={2} justifyContent='space-between'>
          <Box flexGrow={1}>
            <Input type='text' placeholder='Origin' ref={originRef} />
          </Box>
          <Box flexGrow={1}>
            <Input
              type='text'
              placeholder='Destination'
              ref={destinationRef}
            />
          </Box>

          <ButtonGroup>
            <Button colorScheme='pink' onClick={calculateDistance}>
              Calculate Distance
            </Button>
            <IconButton
              aria-label='Clear Route'
              icon={<FaTimes />}
              onClick={clearRoute}
            />
          </ButtonGroup>
        </HStack>
        <HStack spacing={4} mt={4} justifyContent='space-between'>
          <Text>Distance: {distance} </Text>
          <Text>Duration: {duration} </Text>
          <IconButton
            aria-label='Center Back'
            icon={<FaLocationArrow />}
            isRound
            onClick={() => {
              map.panTo(currentLocation || defaultCenter);
              map.setZoom(15);
            }}
          />
        </HStack>
        <Button colorScheme='teal' mt={4} onClick={getCurrentLocation}>
          Get Current Location
        </Button>
      </Box>
    </Flex>
  );
}

export default Trackingorder;
