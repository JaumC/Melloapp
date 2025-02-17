import { createDrawerNavigator } from "@react-navigation/drawer";
import DrawerSection from "@/components/Drawer/DrawerSection";
import GlobalContext from "@/contexts/GlobalContext";

import Login from '@/app/(pages)/Login';
import Home from "@/app/(pages)/Home";

import '../global.css'

//import { Courgette_400Regular } from "@expo-google-fonts/courgette";

const Drawer = createDrawerNavigator();

export default function index() {
  return (
    <GlobalContext>
      <Drawer.Navigator
      initialRouteName="Login"
        screenOptions={{ headerShown: false}}
        drawerContent={(props: any) => <DrawerSection {...props} />}>
        <Drawer.Screen name="Login" component={Login}/>
        <Drawer.Screen name='Home' component={Home}/>
      </Drawer.Navigator>
    </GlobalContext>
  );
}