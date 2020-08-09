import React from 'react';
import { Text, View, Image, ImageBackground, TouchableOpacity } from 'react-native';

import styles from './styles';

import giveClassesBgImage from '../../assets/images/give-classes-background.png';
import { RectButton } from 'react-native-gesture-handler';

import landingImage from '../../assets/images/landing.png';
import studyIcon from '../../assets/images/icons/study.png';
import heartIcon from '../../assets/images/icons/heart.png';
import { useNavigation } from '@react-navigation/native';

function GiveClasses() {
    const { goBack } = useNavigation();

    function handleNavigateBack() {
        goBack();
    }

    return (
        <View style={styles.container}>
            <ImageBackground source={giveClassesBgImage} style={styles.content}
                resizeMode="contain">
                <Text style={styles.title}>
                    Quer ser um Proffy?
                    </Text>
                <Text style={styles.description}>
                    Para começar, você deve se cadastrar como professor na nossa plataforma web.
                    </Text>
            </ImageBackground>
            <RectButton onPress={handleNavigateBack}
                style={styles.okButton}>
                <Text style={styles.okButtonText}>
                    Tudo Bem
                </Text>
            </RectButton>
        </View>
    )
}
export default GiveClasses;