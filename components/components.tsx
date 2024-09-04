import React, {useState} from 'react';
import {Text, View, TextInput, Button, Alert} from 'react-native';
import {RadioButton} from 'react-native-paper';
import {styles} from './stylesheet.tsx';
import {useNavigation} from '@react-navigation/native';
import {
  FECjsonarrexport,
  FPVjsonarrexport,
  contratoarrexport,
  extractInfo,
  index,
  pagamento,
  valueimposto,
} from './pages.tsx';

export const cadastrojsonarr: any[] = [];
export const cadastrojsonarrexport: any[] = [];
export const FPVjsonarr: any[] = [];
export const FECjsonarr: any[] = [];
export const contratojsonarr: any[] = [];
export const descontojsonarr: any[] = [];
export const statearr: any[] = [];
export const leftColumnPhrases: string[] = [
  'Realista',
  'Habilidade em análise',
  'Habilidade introspectiva',
  'Sensível',
  'Reservado',
  'Atento a detalhes',
  'Busca exatidão em seu trabalho',
  'Busca decisões mais seguras',
  'Condescendente',
  'Tem o trabalhar estruturado',
  'Gosta de trabalhar com o conhecido',
  'Se preocupa com a regularidade',
  'Tem estilo consultivo',
  'Calmo',
  'Gosta de rotina',
  'Cauteloso',
  'Gosta de ambientes calmos',
  'Concentrado',
  'Prefere ser orientado',
  'Evita riscos',
  'Introvertido',
  'Mais formal',
  'É mais crítico',
  'Se desenvolve via Trabalho',
];
export const rightColumnPhrases: string[] = [
  'Otimista',
  'Habilidade em comunicação',
  'Habilidade social',
  'Motivador',
  'Comunicador e divulgador',
  'Generalista',
  'Entusiasta',
  'Busca decisões mais rápidas',
  'Dominante',
  'Executa várias coisas ao mesmo tempo',
  'Gosta de novos empreendimentos',
  'Se preocupa com a praticidade',
  'Tem o estilo agressivo',
  'Agitado',
  'Não gosta de rotina',
  'Destemido',
  'Gosta de ambientes agitados',
  'Dinâmico',
  'Gosta de tomar a frente',
  'Assume riscos',
  'Extrovertido',
  'Mais informal',
  'Amigável',
  'Se desenvolve via Relacionamentos',
];
export const cadastroArray: string[] = [
  'Empresa',
  'Razão Social',
  'CNPJ',
  'CEP',
  'Endereço',
  'Bairro',
  'Cidade',
  'Estado',
  'E-mail',
  'Telefone',
  'Responsável legal',
  'CPF',
  'Cargo',
];
export const titlesArray: string[] = [
  'Data do Requerimento',
  'Idade Mínima',
  'Idade Máxima',
  'Gênero',
  'Requisitos do Candidato',
  'Região onde deverá residir',
  'Escolaridade',
  'Descreva o que é desejável no perfil do candidato',
  'Salário Fixo',
  'Comissões',
  'Divulgar valor? (Sim/Não)',
  'Faixa salarial',
  'Benefícios',
  'Descrimine o valor dos benefícios',
  'Atribuições da Função',
  'Carga horária',
  'Tipo de Contratação (CLT/MEI/RPA/Outro)',
  'Previsão para contratação',
  'Observações finais',
];
export const contratoArray: string[] = [
  'Título da vaga',
  'Número de vagas',
  'Valor da vaga (Em R$)',
];
export const descontoArray: string[] = [
  'Qual foi o desconto dado? (Em %)',
  'Qual é a justificativa do desconto?',
];

export function NavegarBtn(props: any, value: boolean) {
  const navigation: any = useNavigation();
  //https://externally-handy-maggot.ngrok-free.app/
  //http://10.0.2.2:8080
  return (
    <Button
      title={props.title}
      onPress={() => {
        fetch('https://externally-handy-maggot.ngrok-free.app/connectioncheck')
          .then(async function (response) {
            return await response.json();
          })
          .then(async function () {
            if (props.post == 'yes') {
              FECjsonarrexport[`FEC${index}`] = FECjsonarr.map(extractInfo);
              fetch('https://externally-handy-maggot.ngrok-free.app/dados', {
                method: 'POST',
                mode: 'cors',
                headers: {
                  Accept: 'application/json',
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                  cadastro: cadastrojsonarr,
                  contratos: contratoarrexport,
                  imposto: valueimposto,
                  formapagamento: pagamento,
                  FPVs: FPVjsonarrexport,
                  FECs: FECjsonarrexport,
                }),
              })
                .then(response => console.log(response))
                .catch(error => {
                  console.error(error);
                });
            }
            navigation.navigate(props.route);
          })
          .catch(error => {
            Alert.alert('Erro', error, [
              {text: 'OK', onPress: () => console.log('OK Pressed')},
            ]);
            console.error(error);
          });
      }}
      disabled={props.disabled}
    />
  );
}

export function MarceloTextBox(props: any) {
  props.arrayjson.length = props.array.length;
  statearr.length = props.array.length;
  const [text, setText] = useState('');
  const textboxobj: Record<string, string> = {
    title: props.title,
    info: text,
  };
  props.arrayjson[props.index] = textboxobj;
  statearr[props.index] = text;
  return (
    <View style={[styles.tabela]}>
      <Text style={[styles.texto, {fontWeight: 'bold'}]}>{props.title}</Text>
      <TextInput
        style={styles.input}
        onChangeText={text => setText(text)}
        value={text}
      />
    </View>
  );
}

export function RadioButtonConstruct(props: any) {
  let limit = props.number - 1;
  FECjsonarr.length = leftColumnPhrases.length;
  const [checked, setChecked] = useState('');
  function RadioConstruct() {
    const radioarray = [];
    const radioobj: Record<string, string> = {
      titleleft: props.title1,
      titleright: props.title2,
      valueleft: '',
      valueright: '',
    };
    FECjsonarr[props.index] = radioobj;
    for (let i = 0; i <= limit; i++) {
      let radiokey = 100 - 25 * i;
      function radiostatus() {
        if (checked == String(i)) {
          radioobj.valueleft = `${radiokey}%`;
          radioobj.valueright = `${100 - radiokey}%`;
          return 'checked';
        } else {
          return 'unchecked';
        }
      }
      radioarray.push(
        <RadioButton
          key={radiokey}
          value={String(i)}
          status={radiostatus()}
          onPress={() => setChecked(String(i))}
        />,
      );
    }

    return radioarray;
  }
  return (
    <View style={[styles.checkbox]}>
      <RadioConstruct />
    </View>
  );
}

function RadioButtonConstruct2(props: any) {
  let limit = props.number - 1;
  FECjsonarr.length = leftColumnPhrases.length;
  const [checked, setChecked] = useState('');
  function RadioConstruct() {
    const radioarray = [];
    const radioobj = {
      titleleft: props.title1,
      titleright: props.title2,
      valueleft: '',
      valueright: '',
    };
    FECjsonarr[props.index] = radioobj;
    for (let i = 0; i <= limit; i++) {
      let radiokey = 100 - 25 * i;
      function radiostatus() {
        if (checked == String(i)) {
          radioobj.valueleft = `${radiokey}%`;
          radioobj.valueright = `${100 - radiokey}%`;
          return 'checked';
        } else {
          return 'unchecked';
        }
      }
      radioarray.push(
        <RadioButton
          key={radiokey}
          value={String(i)}
          status={radiostatus()}
          onPress={() => setChecked(String(i))}
        />,
      );
    }

    return radioarray;
  }
  return (
    <View style={[styles.checkbox]}>
      <RadioConstruct />
    </View>
  );
}

export function RadioButtonPackFEC(props: Record<string, string | number>) {
  return (
    <View style={[styles.radio]}>
      <Text style={[styles.textofec, {fontWeight: 'bold'}]}>
        {props.title0}
      </Text>
      <RadioButtonConstruct
        number={props.number}
        title1={props.title0}
        title2={props.title1}
        index={props.index}
      />
      <Text style={[styles.textofec, {fontWeight: 'bold'}]}>
        {props.title1}
      </Text>
    </View>
  );
}

export function RadioButtonPackSpecial(props: Record<string, string | number>) {
  return (
    <View style={[styles.tabela]}>
      <Text style={[styles.texto, {fontWeight: 'bold'}]}>{props.title}</Text>
      <Text style={[styles.texto, {fontWeight: 'bold'}]}>{props.title2}</Text>
      <RadioButtonConstruct2 number={props.number} />
    </View>
  );
}

export function RadioButtonPackBackup(props: Record<string, string | number>) {
  return (
    <View style={[styles.radio]}>
      <Text style={[styles.texto, {fontWeight: 'bold'}]}>
        {props.title0}/{props.title1}
      </Text>
      <Text style={[styles.texto, {fontWeight: 'bold'}]}>{props.title2}</Text>
      <RadioButtonConstruct
        number={props.number}
        title1={props.title0}
        title2={props.title1}
        index={props.index}
      />
    </View>
  );
}
