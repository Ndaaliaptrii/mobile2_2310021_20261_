import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  Keyboard
} from 'react-native';

export default function Kalkulator() {
  // State dengan tipe data eksplisit: string untuk input dan number/string/null untuk hasil
  const [angkaPertama, setAngkaPertama] = useState<string>('');
  const [angkaKedua, setAngkaKedua] = useState<string>('');
  const [hasil, setHasil] = useState<number | string | null>(null);

  // Fungsi untuk melakukan kalkulasi aritmatika dengan parameter berjenis string ('+' | '-' | '*' | '/')
  const hitung = (operasi: '+' | '-' | '*' | '/') => {
    Keyboard.dismiss(); // Menutup keyboard saat tombol ditekan

    // Validasi input kosong
    if (angkaPertama.trim() === '' || angkaKedua.trim() === '') {
      setHasil('Mohon isi kedua angka terlebih dahulu');
      return;
    }

    // Konversi teks masukan menjadi angka
    const num1 = parseFloat(angkaPertama);
    const num2 = parseFloat(angkaKedua);

    // Validasi angka numerik
    if (isNaN(num1) || isNaN(num2)) {
      setHasil('Masukan harus berupa angka yang valid');
      return;
    }

    let result = 0;

    switch (operasi) {
      case '+':
        result = num1 + num2;
        break;
      case '-':
        result = num1 - num2;
        break;
      case '*':
        result = num1 * num2;
        break;
      case '/':
        // Penanganan khusus operasi pembagian dengan nol
        if (num2 === 0) {
          setHasil('Angka pembagi tidak boleh nol');
          return;
        }
        result = num1 / num2;
        break;
      default:
        return;
    }

    setHasil(result);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Mini Kalkulator</Text>

      {/* Kolom Masukan / TextInput */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Angka Pertama"
          keyboardType="numeric"
          value={angkaPertama}
          onChangeText={setAngkaPertama}
        />
        <TextInput
          style={styles.input}
          placeholder="Angka Kedua"
          keyboardType="numeric"
          value={angkaKedua}
          onChangeText={setAngkaKedua}
        />
      </View>

      {/* Baris Tombol Operasi dengan Flexbox */}
      <View style={styles.buttonRow}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => hitung('+')}
        >
          <Text style={styles.buttonText}>+</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => hitung('-')}
        >
          <Text style={styles.buttonText}>-</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => hitung('*')}
        >
          <Text style={styles.buttonText}>×</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => hitung('/')}
        >
          <Text style={styles.buttonText}>÷</Text>
        </TouchableOpacity>
      </View>

      {/* Wadah / Kartu Hasil Perhitungan */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Hasil Perhitungan:</Text>
        <Text style={styles.cardResult}>
          {hasil !== null ? String(hasil) : '-'}
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#333',
  },
  inputContainer: {
    marginBottom: 20,
  },
  input: {
    backgroundColor: '#fff',
    paddingHorizontal: 15,
    paddingVertical: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    fontSize: 16,
    marginBottom: 12,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 25,
  },
  button: {
    flex: 1,
    backgroundColor: '#007AFF',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginHorizontal: 4,
  },
  buttonText: {
    color: '#fff',
    fontSize: 22,
    fontWeight: 'bold',
  },
  card: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 12,
    alignItems: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  cardTitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 8,
  },
  cardResult: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#007AFF',
    textAlign: 'center',
  },
});