import React, {useEffect, useState} from 'react';
import {
  Alert,
  Button,
  Text,
  View,
  TextInput,
  ScrollView,
  Linking,
} from 'react-native';
import {styles} from './stylesheet';
import {
  FECjsonarr,
  FPVjsonarr,
  MarceloTextBox,
  NavegarBtn,
  RadioButtonPackFEC,
  cadastroArray,
  cadastrojsonarr,
  contratoArray,
  contratojsonarr,
  descontoArray,
  descontojsonarr,
  leftColumnPhrases,
  rightColumnPhrases,
  titlesArray,
} from './components';
import CheckBox from '@react-native-community/checkbox';
import 'react-native-fs';
import {useFocusEffect} from '@react-navigation/native';
import {useNavigation} from '@react-navigation/native';
import RNSketchCanvas from '@sourcetoad/react-native-sketch-canvas';

let RNFS = require('react-native-fs');

export function extractInfo(item: any) {
  return item;
}

export function Homepage() {
  //pagina principal
  function indisponivel() {
    Alert.alert('Erro', 'Funcionalidade indisponível no momento!', [
      {text: 'OK', onPress: () => console.log('OK Pressed')},
    ]);
  }
  return (
    <ScrollView>
      <Text style={[styles.texto, {fontWeight: 'bold'}]}>
        Bem vindo à criação automatizada de contatos da HunteRH!
      </Text>
      <Button
        onPress={indisponivel}
        title="Inserir CNPJ"
        color="#841584"
        accessibilityLabel="Learn more about this purple button"
      />
      <NavegarBtn title="Fazer Cadastro" route={Cadastro} />
    </ScrollView>
  );
}

export function ToContrato() {
  //retornar pra contrato sem salvar informações
  const navigation: any = useNavigation();
  return <ScrollView>{navigation.navigate(Contrato)}</ScrollView>;
}

export function ToContratoQtd() {
  //retornar pra contrato sem salvar informações
  const navigation: any = useNavigation();
  return <ScrollView>{navigation.navigate(Contratoqtd)}</ScrollView>;
}

export function Cadastro() {
  //pagina de cadastro

  const cadastroArr = [];
  let buttondisabled: boolean = false;
  for (let i = 0; i < cadastroArray.length; i++) {
    cadastroArr.push(
      <MarceloTextBox
        key={String(i)}
        title={cadastroArray[i]}
        arrayjson={cadastrojsonarr}
        array={cadastroArray}
        index={i}
      />,
    ); //array que cria os campos de texto automaticamente
  }

  return (
    <ScrollView>
      <Text style={[styles.titulo, {fontWeight: 'bold'}]}>
        DADOS DA EMPRESA
      </Text>
      {cadastroArr}
      <NavegarBtn
        title="Finalizar Cadastro"
        route={Contratoqtd}
        disabled={buttondisabled}
      />
    </ScrollView>
  );
}

export let counter: number = 0;
let FECcounter: number = 0;
export let valueimposto: number = 0;
export let pagamento: string;
export function Contratoqtd() {
  const [text, setText] = useState('');
  const [pag, setPag] = useState('');
  pagamento = pag;
  const [toggleCheckBox, setToggleCheckBox] = useState(false);
  let buttondisabled: boolean = false;
  useFocusEffect(function Callback() {
    counter = Number(text);
    FECcounter = Number(text);
    index = 0;
  });
  function imposto(value: boolean) {
    if (value == true) {
      valueimposto = 0.1633;
    } else {
      valueimposto = 0;
    }
    return setToggleCheckBox(value);
  }
  if (text === '' || pag === '') {
    buttondisabled = true;
  }
  return (
    <ScrollView>
      <View style={styles.tabela}>
        <Text style={[styles.texto, {fontWeight: 'bold'}]}>
          Quantos cargos serão solicitados?
        </Text>
        <TextInput
          style={styles.input}
          onChangeText={text => setText(text)}
          value={text}
        />
        <Text style={[styles.texto, {fontWeight: 'bold'}]}>
          Qual será a forma de pagamento?
        </Text>
        <TextInput
          style={styles.input}
          onChangeText={pag => setPag(pag)}
          value={pag}
        />
        <Text style={[styles.texto, {fontWeight: 'bold'}]}>
          Calcular imposto?
        </Text>
        <CheckBox
          disabled={false}
          value={toggleCheckBox}
          onValueChange={imposto}
        />
        <NavegarBtn
          title="Prosseguir"
          route={Contrato}
          disabled={buttondisabled}
        />
      </View>
    </ScrollView>
  );
}

export const contratoarrexport: Record<string, any[]> = {};
export const descontoarrexport: any = {};
export const FPVjsonarrexport: Record<string, any[]> = {};
export const FECjsonarrexport: any = {};
export function Contrato() {
  const [toggleCheckBox2, setToggleCheckBox2] = useState(false);
  const [display, setDisplay] = useState(0);
  let buttondisabled: boolean = false;
  useFocusEffect(function Callback() {
    if (counter < FECcounter) {
      FECjsonarrexport[`FEC${index}`] = FECjsonarr.map(extractInfo);
      index++;
    }
  });
  const contratoArr = [];
  const descontoArr = [];

  for (let i = 0; i < contratoArray.length; i++) {
    contratoArr.push(
      <MarceloTextBox
        key={String(i)}
        title={contratoArray[i]}
        arrayjson={contratojsonarr}
        array={contratoArray}
        index={i}
      />,
    );
  }
  for (let i = 0; i < descontoArray.length; i++) {
    descontoArr.push(
      <MarceloTextBox
        key={String(i)}
        title={descontoArray[i]}
        arrayjson={descontojsonarr}
        array={descontoArray}
        index={i}
      />,
    );
  }
  function desconto(value: boolean) {
    if (value == true) {
      setDisplay(1);
    } else {
      setDisplay(0);
    }
    return setToggleCheckBox2(value);
  }
  if (contratojsonarr.find(item => item.info) == '' && display == 0) {
    buttondisabled = true;
  } else if (
    contratojsonarr.find(item => item.info) == '' &&
    display == 1 &&
    descontojsonarr.find(item => item.info) == ''
  ) {
    buttondisabled = true;
  }
  return (
    <ScrollView>
      <Text style={[styles.titulo, {fontWeight: 'bold'}]}>
        DADOS DO CONTRATO
      </Text>
      {contratoArr}
      <Text style={[styles.texto, {fontWeight: 'bold'}]}>Dar desconto?</Text>
      <CheckBox
        disabled={false}
        value={toggleCheckBox2}
        onValueChange={desconto}
      />
      <View style={{transform: [{scale: display}]}}>{descontoArr}</View>
      <NavegarBtn
        title="Finalizar Contrato"
        route={FPV}
        disabled={buttondisabled}
      />
    </ScrollView>
  );
}

export let index: number = 0;
export function FPV() {
  let buttondisabled: boolean = false;
  let FPVArr = [];
  for (let i = 0; i < titlesArray.length; i++) {
    FPVArr.push(
      <MarceloTextBox
        key={String(i)}
        title={titlesArray[i]}
        arrayjson={FPVjsonarr}
        array={titlesArray}
        index={i}
      />,
    );
  }
  contratoarrexport[`contrato${index}`] = contratojsonarr.map(extractInfo);
  descontoarrexport[`desconto${index}`] = descontojsonarr.map(extractInfo);
  if (FPVjsonarr.find(item => item.info) == '') {
    buttondisabled = true;
  }
  return (
    <ScrollView>
      <Text style={[styles.titulo, {fontWeight: 'bold'}]}>PERFIL DA VAGA</Text>
      {FPVArr}
      <NavegarBtn title="Finalizar FPV" route={FEC} disabled={buttondisabled} />
    </ScrollView>
  );
}

export function FEC() {
  let FECarr = [];
  let buttondisabled: boolean = false;
  for (let i = 0; i < leftColumnPhrases.length; i++) {
    FECarr.push(
      <RadioButtonPackFEC
        key={String(i)}
        number={5}
        title0={leftColumnPhrases[i]}
        title1={rightColumnPhrases[i]}
        index={i}
      />,
    );
  }
  if (FECjsonarr.find(item => item.valueleft) == '') {
    buttondisabled = true;
  }

  let repeatbutton: any;

  if (counter > 1) {
    repeatbutton = (
      <NavegarBtn
        title="Finalizar FEC"
        route={Contrato}
        disabled={buttondisabled}
      />
    );
    console.log(counter);
    counter--;
  } else {
    repeatbutton = (
      <NavegarBtn
        title="Finalizar FEC"
        route={Makepdf}
        post="yes"
        disabled={buttondisabled}
      />
    );
  }

  FPVjsonarrexport[`FPV${index}`] = FPVjsonarr.map(extractInfo);
  return (
    <ScrollView>
      <View>
        <Text style={styles.titulo}>FERRAMENTA DE ENGENHARIA</Text>
        <Text style={styles.titulo}>COMPORTAMENTAL - FEC</Text>
      </View>
      <View style={styles.container2}>
        <Text style={styles.texto}>Prezado Cliente,</Text>
        <Text style={styles.texto}>
          Esta é a nossa{' '}
          <Text style={{fontWeight: 'bold'}}>
            Ferramenta de Engenharia Comportamental - FEC
          </Text>
          , um importante instrumento para ajudar a definir o perfil
          comportamental ideal de seu candidato.
        </Text>
        <Text style={[styles.texto, {fontWeight: 'bold'}]}>
          Clique em um dos quadradinhos por linha para calibrar as habilidades
          comportamentais
        </Text>
        <Text style={styles.texto}>
          Se marcar 50% você estará optando por um equilíbrio entre habilidades
          opostas.
        </Text>
        <Text style={styles.texto}>
          Você pode dosar um pouco mais cada linha de habilidades distintas
        </Text>
        <View></View>
      </View>
      <Text style={[styles.texto, {fontWeight: 'bold'}, {textAlign: 'center'}]}>
        ESCALAS POR ADJETIVOS OPOSTOS
      </Text>
      <Text style={[styles.texto, {fontWeight: 'bold'}, {textAlign: 'center'}]}>
        100% 75% 50% 75% 100%
      </Text>
      <View style={styles.tabela}>
        {FECarr}
        {repeatbutton}
      </View>
    </ScrollView>
  );
}

let browserdisabled: boolean = true;

export function Makepdf() {
  function loadinbrowser() {
    Alert.alert(
      'Aviso',
      'Salvar o PDF localmente só funciona com o Google Chrome',
      [
        {
          text: 'OK',
          onPress: () =>
            Linking.openURL(
              'https://externally-handy-maggot.ngrok-free.app/',
            ).catch(err => console.error("Couldn't load page", err)),
        },
      ],
    );
  }
  return (
    <View>
      <Button onPress={loadinbrowser} title="Vizualizar Contrato" />
      <NavegarBtn title="Assinar Contrato" route={SignDocument} />
      <NavegarBtn title="Refazer" route={Contratoqtd} />
    </View>
  );
}

export function SignDocument() {
  return (
    <View style={{flex: 1, flexDirection: 'row'}}>
      <RNSketchCanvas
        containerStyle={{backgroundColor: 'transparent', flex: 1}}
        canvasStyle={{backgroundColor: 'transparent', flex: 1}}
        defaultStrokeIndex={0}
        defaultStrokeWidth={5}
        closeComponent={
          <View style={styles.functionButton}>
            <Text style={{color: 'white'}}>Close</Text>
          </View>
        }
        undoComponent={
          <View style={styles.functionButton}>
            <Text style={{color: 'white'}}>Undo</Text>
          </View>
        }
        clearComponent={
          <View style={styles.functionButton}>
            <Text style={{color: 'white'}}>Clear</Text>
          </View>
        }
        eraseComponent={
          <View style={styles.functionButton}>
            <Text style={{color: 'white'}}>Eraser</Text>
          </View>
        }
        strokeComponent={color => (
          <View style={[{backgroundColor: color}, styles.strokeColorButton]} />
        )}
        strokeSelectedComponent={(color, index, changed) => {
          return (
            <View
              style={[
                {backgroundColor: color, borderWidth: 2},
                styles.strokeColorButton,
              ]}
            />
          );
        }}
        strokeWidthComponent={w => {
          return (
            <View style={styles.strokeWidthButton}>
              <View
                style={{
                  backgroundColor: 'white',
                  marginHorizontal: 2.5,
                  width: Math.sqrt(w / 3) * 10,
                  height: Math.sqrt(w / 3) * 10,
                  borderRadius: (Math.sqrt(w / 3) * 10) / 2,
                }}
              />
            </View>
          );
        }}
        saveComponent={
          <View style={styles.functionButton}>
            <Text style={{color: 'white'}}>Save</Text>
          </View>
        }
        savePreference={() => {
          return {
            folder: 'sign',
            filename: 'sign',
            transparent: true,
            imageType: 'png',
          };
        }}
        onSketchSaved={(success, path) => {
          Alert.alert(
            success
              ? 'Assinatura salva e enviada para o contrato!'
              : 'Falha ao salvar a imagem',
            path,
          );
          RNFS.readFile(
            RNFS.PicturesDirectoryPath + '/sign/sign.png',
            'base64',
          ).then(function (res: any) {
            browserdisabled = false;
            fetch('https://externally-handy-maggot.ngrok-free.app/sign', {
              method: 'POST',
              mode: 'cors',
              headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                assinatura: res,
              }),
            })
              .then(response => console.log(response))
              .then(function () {
                return (
                  RNFS.unlink(RNFS.PicturesDirectoryPath + '/sign/sign.png')
                    .then(() => {
                      console.log('FILE DELETED');
                    })
                    // `unlink` will throw an error, if the item to unlink does not exist
                    .catch((err: any) => {
                      console.log(err.message);
                    })
                );
              })
              .catch(error => {
                console.error(error);
              });
          });
        }}
      />
    </View>
  );
}
