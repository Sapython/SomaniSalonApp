import Congratulations from "./screens/Congratulations";
import ExpiryCoins from "./screens/ExpireCoins";
import LoyaltyPoints from "./screens/LoyaltyPoints";
import Profile from "./screens/Profile";
import ContactUs from "./screens/ContactUs";
import InviteFrnds from "./screens/InviteFrnds";
import Settings from "./screens/Settings";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "./screens/loginScreen.js";
import Registration from "./screens/register.js";
import StartScreen from "./screens/startScreen.js";
import HomeScreen from "./screens/homeScreen.js";
import MenuScreen from "./screens/menuScreen.js";
import PopularStylist from "./screens/popularStylist.js";
import Services from "./screens/servicesPage.js";
import ServicePage from "./screens/servicePage.js";
import Schedule from "./screens/schedule.js";
import Search from "./screens/Search";
import Address from "./screens/address.js";
import Location from "./screens/location.js";
import CheckOut from "./screens/checkOutScreen.js";
import PaymentConfirm from "./screens/paymnetConfirm.js";
import ProcessingPage from "./screens/paymentProcess.js";
import MyAppointment from "./screens/MyAppointment";
import Notifications from "./screens/Notifications";
import Review from "./screens/review";
import WriteReview from "./screens/WriteReview";
import AppLoading from "expo-app-loading";
import * as SplashScreen from 'expo-splash-screen';
// import * as Font from 'expo-font';
import {
  useFonts,
  Montserrat_500Medium,
  Montserrat_600SemiBold,
} from "@expo-google-fonts/dev";
import selectPlace from "./screens/selectPlace";
import Packages from "./screens/Packages";
const Stack = createNativeStackNavigator();
SplashScreen.preventAutoHideAsync();
SplashScreen.hideAsync();

export default function App() {


  let [fontsLoaded] = useFonts({
    Montserrat_500Medium,
    Montserrat_600SemiBold
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }
  else {


    return (

      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          
            <Stack.Screen name="start" component={StartScreen} />
            <Stack.Screen name="login" component={LoginScreen} />
            <Stack.Screen name="register" component={Registration} />
            <Stack.Screen name="search" component={Search} />
            <Stack.Screen name="home" component={HomeScreen} />
            <Stack.Screen name="menu" component={MenuScreen} />
            <Stack.Screen name="popularStylist" component={PopularStylist} />
            <Stack.Screen name="services" component={Services} />
          <Stack.Screen name="servicePlace" component={selectPlace} />
          <Stack.Screen name="service" component={ServicePage} />
          <Stack.Screen name="schedule" component={Schedule} />
          <Stack.Screen name="address" component={Address} />
          <Stack.Screen name="location" component={Location} />
          <Stack.Screen name="checkOut" component={CheckOut} />
          <Stack.Screen name="Processing" component={ProcessingPage} />
          <Stack.Screen name="confirm" component={PaymentConfirm} />
          <Stack.Screen name="appointment" component={MyAppointment} />
          <Stack.Screen name="notification" component={Notifications} />
          <Stack.Screen name="review" component={Review} />
          <Stack.Screen name="Profile" component={Profile} />
          <Stack.Screen name="Search" component={Search} />
          <Stack.Screen name="LoyaltyPoints" component={LoyaltyPoints} />
          <Stack.Screen name="ExpiryCoins" component={ExpiryCoins} />
          <Stack.Screen name="Congratulations" component={Congratulations} />
          <Stack.Screen name="ContactUs" component={ContactUs} />
          <Stack.Screen name="InviteFrnds" component={InviteFrnds} />
          <Stack.Screen name="Settings" component={Settings} />
          <Stack.Screen name="writeReview" component={WriteReview} />
          <Stack.Screen name="package" component={Packages} />
        </Stack.Navigator>
      </NavigationContainer>

    );
  }
}
