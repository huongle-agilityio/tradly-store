import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Feed} from './Feed';
import {Message} from './Message';

const Tab = createBottomTabNavigator();

export const Details = () => (
  <Tab.Navigator>
    <Tab.Screen name="Feed" component={Feed} />
    <Tab.Screen name="Message" component={Message} />
  </Tab.Navigator>
);
