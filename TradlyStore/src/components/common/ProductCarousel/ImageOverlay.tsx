import { memo } from 'react';
import { Modal, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Animated, { ScrollHandlerProcessed } from 'react-native-reanimated';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';

// Components
import { Image } from './Image';

// Icons
import { CloseIcon } from '@/components/icons';

interface ImageOverlayProps {
  isOverlayVisible: boolean;
  images: string[];
  scrollHandler: ScrollHandlerProcessed<Record<string, unknown>>;
  toggleOverlay: () => void;
}

export const ImageOverlay = memo(
  ({
    images,
    isOverlayVisible,
    toggleOverlay,
    scrollHandler,
  }: ImageOverlayProps) => (
    <SafeAreaProvider>
      <SafeAreaView style={styles.centeredView}>
        <Modal
          animationType="slide"
          backdropColor="transparent"
          visible={isOverlayVisible}
          onRequestClose={toggleOverlay}
        >
          <GestureHandlerRootView>
            <ScrollView style={styles.overlayBackdrop}>
              <Animated.ScrollView
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                scrollEventThrottle={16}
                onScroll={scrollHandler}
              >
                {images.map((image, index) => (
                  <Image key={index} index={index} image={image} />
                ))}
              </Animated.ScrollView>
              <TouchableOpacity
                style={styles.closeButton}
                onPress={toggleOverlay}
              >
                <CloseIcon width={20} height={20} color="white" />
              </TouchableOpacity>
            </ScrollView>
          </GestureHandlerRootView>
        </Modal>
      </SafeAreaView>
    </SafeAreaProvider>
  ),
);

const styles = StyleSheet.create({
  overlayBackdrop: {
    flex: 1,
  },
  closeButton: {
    position: 'absolute',
    top: 45,
    right: 30,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
