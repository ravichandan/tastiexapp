import { theme } from '@/shared/theme';
import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';

export default function About() {
    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.contentContainer}>
                {/* <Image source={require('@/assets/images/about-image.png')} style={styles.image} /> */}
                <Text style={styles.title}>About Tastiex</Text>
                <Text style={styles.paragraph}>
                    Welcome to Tastiex, your ultimate food finding companion! We are dedicated to bringing you the best culinary experiences from local restaurants right to your fingertips.
                </Text>
                <Text style={styles.paragraph}>
                    Our mission is to connect food lovers with their favorite eateries, making it easier than ever to discover and enjoy delicious meals. Whether you're craving a quick snack or a gourmet feast, Tastiex has got you covered.
                </Text>
                <Text style={styles.paragraph}>
                    At Tastiex, we believe that great food should be accessible to everyone. That's why we partner with a diverse range of restaurants, from hidden gems to popular chains, ensuring there's something for every palate.
                </Text>
                <Text style={styles.paragraph}>
                    Our user-friendly app allows you to browse menus, read reviews, and place orders with just a few taps. Plus, our reliable delivery service ensures your food arrives fresh and on time.
                </Text>
                <Text style={styles.paragraph}>
                    Thank you for choosing Tastiex. We look forward to serving you and making every meal a memorable one!
                </Text>
                <Text style={styles.signature}>- The Tastiex Team</Text>
                <Text style={styles.copyRight}>© 2025 Chandan Sithiraju. All rights reserved.</Text>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    contentContainer: {
        padding: 20,
        alignItems: 'center',
    },
    image: {
        width: 150,
        height: 150,
        marginBottom: 20
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    paragraph: {
        fontSize: 16,   
        marginBottom: 15,
        color: theme.colors.textSecondary,
    },
    signature: {
        fontSize: 16,
        fontStyle: 'italic',
        marginTop: 20,
    },
    copyRight: {
        fontSize: 12,
        color: '#888',
        marginTop: 10,
    },
});