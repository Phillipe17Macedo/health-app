import React from "react";
import {
  Ionicons,
} from "@expo/vector-icons";
import { Text, Pressable, TouchableOpacity } from "react-native";
import { Link } from "expo-router";
import { styles } from "./styles";

export function Header() {
  return (
    <TouchableOpacity style={styles.container}>
      <Link href="/perfil" asChild>
        <Pressable>
          {({ pressed }) => (
            <Ionicons
              name="person-circle"
              size={58}
              color="#65A693"
              style={[styles.headerRight, { opacity: pressed ? 0.5 : 1 }]}
            />
          )}
        </Pressable>
      </Link>
      <Link href='/perfil' asChild style={[styles.containerTextoHeader]}>
        <Pressable>
            <Text style={[styles.nomeUsuario]}>Olá, Maria</Text>
            <Text style={[styles.textoPerfilConfi]}>Perfil e configurações </Text>
        </Pressable>
      </Link>
    </TouchableOpacity>
  );
}
