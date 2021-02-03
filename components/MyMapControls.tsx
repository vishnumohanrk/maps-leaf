import {
  Box,
  Button,
  Flex,
  IconButton,
  Slider,
  SliderFilledTrack,
  SliderThumb,
  SliderTrack,
  Text,
  Tooltip,
  useBreakpointValue,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { MdAdd, MdGpsFixed, MdRemove } from 'react-icons/md';

interface MyMapControlsProps {
  zoomIn: () => void;
  zoomOut: () => void;
  zoomLevel: number;
  mapZoom: (n: number) => void;
}

const MyMapControls = ({ zoomIn, zoomOut, zoomLevel, mapZoom }: MyMapControlsProps) => {
  const [showSlider, setShowSlider] = useState(false);
  const [value, setValue] = useState(zoomLevel);
  const ttPlacement = useBreakpointValue({ base: 'right', md: 'left' }) as 'left' | 'right';

  const toggleSlider = () => setShowSlider(!showSlider);

  const handleSlider = (newVal: number) => {
    setValue(newVal);
    mapZoom(newVal);
  };

  useEffect(() => {
    if (zoomLevel !== value) {
      setValue(zoomLevel);
    }
  }, [zoomLevel]);

  return (
    <Flex
      direction="column"
      position="absolute"
      top={{ base: 2, md: 'auto' }}
      left={{ base: 2, md: 'auto' }}
      bottom={{ md: 7 }}
      right={{ md: 4 }}
      zIndex={999}
    >
      <Tooltip gutter={1.5} label="Your Location" placement={ttPlacement}>
        <IconButton bgColor="white" aria-label="your location" icon={<MdGpsFixed size={20} />} mb={2} />
      </Tooltip>

      <Flex direction="column" className="zoomBtnGroup">
        <IconButton
          bgColor="white"
          aria-label="Zoom in"
          icon={<MdAdd size={20} />}
          disabled={zoomLevel === 18}
          onClick={zoomIn}
          borderBottomRadius={0}
          borderBottomWidth={showSlider ? 0 : 3}
          borderBottomColor="gray.300"
        />

        <Box
          p={2}
          display="none"
          className="zoomBtnGroupTT"
          flexDirection="column"
          position="absolute"
          w="max-content"
          bgColor="gray.700"
          textColor="white"
          borderRadius="2px"
          left={{ base: '2.5rem', md: '-6.95rem' }}
          top={{ base: 14, md: showSlider ? '12.5rem' : 14 }}
        >
          <Text>Zoom</Text>
          <Button onClick={toggleSlider} variant="link" textDecoration="underline" textColor="blue.500">
            Toggle Slider
          </Button>
        </Box>

        {showSlider ? (
          <Slider
            max={18}
            min={0}
            step={1}
            value={value}
            onChange={handleSlider}
            aria-label="zoom-slider"
            orientation="vertical"
            h={36}
          >
            <SliderTrack>
              <SliderFilledTrack />
            </SliderTrack>
            <SliderThumb />
          </Slider>
        ) : null}

        <IconButton
          bgColor="white"
          aria-label="Zoom out"
          icon={<MdRemove size={20} />}
          disabled={zoomLevel === 0}
          onClick={zoomOut}
          borderTopRadius={0}
        />
      </Flex>
    </Flex>
  );
};

export default MyMapControls;
