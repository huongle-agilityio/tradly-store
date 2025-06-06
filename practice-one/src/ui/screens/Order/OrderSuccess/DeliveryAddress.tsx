import { memo } from 'react';
import { View } from 'react-native';
import { deliveryAddressStyles } from './styles';

// Components
import { Text } from '@/ui/components';

export const DeliveryAddress = memo(() => (
  <View style={deliveryAddressStyles.container}>
    <View style={deliveryAddressStyles.titleWrapper}>
      <Text fontWeight="medium" fontSize="md" color="quaternary">
        Delivery Address
      </Text>
    </View>

    <View style={deliveryAddressStyles.textWrapper}>
      <Text fontWeight="normal" color="quaternary">
        Tradly team
      </Text>
      <Text fontSize="sm" fontWeight="normal" color="fade">
        Flat Number 512, Eden Garden, Rewari
      </Text>
      <View style={{ flexDirection: 'row', gap: 5 }}>
        <Text fontSize="sm" fontWeight="normal" color="fade">
          Mobile:
        </Text>
        <Text fontSize="sm" fontWeight="normal" color="quaternary">
          9876543210
        </Text>
      </View>
    </View>
  </View>
));

DeliveryAddress.displayName = 'DeliveryAddress';
