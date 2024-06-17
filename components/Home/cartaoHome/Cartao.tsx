import React from "react";
import { View, TouchableOpacity, Text, Image, Dimensions } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Link } from "expo-router";
import { styles } from "./styles";

interface User {
  nome: string;
  dataNasc: string;
  tipoAdesao: string;
  statusContrato: boolean;
  titularDoContrato: boolean;
  fotoBase64: string;
}

interface CartaoProps {
  user: User;
}

export function Cartao({ user }: CartaoProps) {
  const alterarEstiloStatus = () => {
    return user.statusContrato ? styles.statusAtivado : styles.statusDesativado;
  };

  const alterarEstiloUsuario = () => {
    return user.titularDoContrato ? styles.userTitular : styles.userDependente;
  };

  const statusText = user.statusContrato ? "Ativado" : "Desativado";

  const titularContrato = user.titularDoContrato ? "Titular" : "Dependente";

  // Aqui eu convert a string base64 para um URI utilizável pelo componente <Image />
  const fotoUri = user.fotoBase64 ? `data:image/jpeg;base64,${user.fotoBase64}` : null;
  // Se caso o usuário não tiver uma imegem no banco, irá aparecer esse icone padrão
  const imagemPadrao = require("../../../assets/images/icons8-personUnisex-94.png");

  const { width, height } = Dimensions.get('screen');

  const formatarNomeLinhas = (nome: string) => {
    if (nome.length <= 25){
      return [nome];
    }

    const palavras = nome.split(" ");
    let linha1 = "";
    let linha2 = "";

    for (let palavra of palavras) {
      if ((linha1 + palavra).length <= 26) {
        linha1 += palavra + " ";
      } else {
        linha2 += palavra + " ";
      }
    }
    return [linha1.trim(), linha2.trim()];
  };

  const [linha1, linha2] = formatarNomeLinhas(user.nome);

  return (
    <>
      <TouchableOpacity>
        <Link href={"/perfil"} style={[styles.containerLink]}>
          <LinearGradient
            colors={["#025940", "#8CBF1F"]}
            start={{ x: 0, y: 1 }}
            end={{ x: 1.3, y: 0.5 }}
            style={[styles.containerCard]}
          >
            <View style={[styles.componenteCard]}>
              <View style={[styles.containerImagemUser]}>
                <Image
                  source={fotoUri ? { uri: fotoUri } : imagemPadrao}
                  style={[{width: 94, height: 120, borderRadius: 15, resizeMode: 'contain'}]}
                />
              </View>

              <View style={[styles.containerDadosUser]}>
                <Text style={[styles.textoPadraoUser, { fontSize: width * 0.032 }]}>{linha1}</Text>
                {linha2 && <Text style={[styles.textoPadraoUser, { fontSize: width * 0.032 }]}>{linha2}</Text>}
                <Text style={[styles.descricaoNome, { fontSize: width * 0.027, fontWeight: 'normal' }]}>Nome do Beneficiário</Text>

                <Text style={[styles.textoPadraoUser, { fontSize: width * 0.032 }]}>
                  {user.dataNasc}
                </Text>
                <Text style={[styles.descricaoDataNascimento, { fontSize: width * 0.027, fontWeight: 'normal' }]}>
                  Data de Nascimento
                </Text>

                <Text style={[styles.textoPadraoUser, { fontSize: width * 0.032 }]}>{user.tipoAdesao}</Text>
                <Text style={[styles.descricaoDataNascimento, { fontSize: width * 0.027, fontWeight: 'normal' }]}>Tipo de Adesão</Text>

                <Text style={[styles.textoPadraoUser, alterarEstiloUsuario(), { fontSize: width * 0.032 }]}>{titularContrato}</Text>
                <Text style={[styles.descricaoDataNascimento, { fontSize: width * 0.027, fontWeight: 'normal' }]}>Tipo de Usuário</Text>

                <View style={[styles.containerStatusPessoa,]}>
                  <Text style={[styles.descricaoStatusPessoa, { fontSize: width * 0.032, paddingTop: height * 0.005 }]}>STATUS CONTRATO:</Text>
                  <View style={[styles.containerStatus, alterarEstiloStatus()]}>
                    <Text style={[styles.textoStatus, { fontSize: width * 0.032 }]}>{statusText}</Text>
                  </View>
                </View>
              </View>
            </View>
          </LinearGradient>
        </Link>
      </TouchableOpacity>
    </>
  );
}
