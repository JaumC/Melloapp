import { Image, StyleSheet, View, ScrollView, Text, TouchableOpacity, Dimensions } from "react-native";

import { DrawerContentScrollView, DrawerItem } from "@react-navigation/drawer";

import { useContext, useEffect, useState } from "react";

import UserContext from "@/contexts/Providers/UserProvider";

export default function DrawerSection(props: any) {
  
  return (
      <DrawerContentScrollView
        {...props}
        showsVerticalScrollIndicator={false}>
        
      </DrawerContentScrollView>
    );
}