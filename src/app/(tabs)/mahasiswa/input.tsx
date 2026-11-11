import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Alert } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useMahasiswa } from "../../context/MahasiswaContext";

export default function InputMahasiswaScreen() {
  const { tambahMahasiswa } = useMahasiswa();

  const [nim, setNim] = useState("");
  const [nama, setNama] = useState("");
  const [prodi, setProdi] = useState("");
  const [status, setStatus] = useState<"Aktif" | "Cuti">("Aktif"); // State default "Aktif"

  const handleSimpan = () => {
    if (!nim.trim() || !nama.trim() || !prodi.trim()) {
      Alert.alert("Peringatan", "Semua kolom wajib diisi!");
      return;
    }

    // Panggil fungsi tambahMahasiswa (sudah otomatis tervalidasi NIM unik dari Context)
    tambahMahasiswa({
      nim: nim.trim(),
      nama: nama.trim(),
      prodi: prodi.trim(),
      status: status,
    });

    // Reset form jika berhasil disimpan (atau jika ingin mengosongkannya)
    // Catatan: Jika NIM kembar, alert "Gagal" akan muncul dari Context, 
    // jadi kita bisa mengosongkan form hanya jika berhasil. 
    // Namun untuk amannya kita biarkan user melihat atau mereset manual.
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.title}>Tambah Data Mahasiswa Baru</Text>
      <Text style={styles.subtitle}>Masukkan informasi lengkap mahasiswa di bawah ini:</Text>

      <View style={styles.formGroup}>
        <Text style={styles.label}>NIM</Text>
        <TextInput
          style={styles.input}
          placeholder="Contoh: 230101006"
          placeholderTextColor="#94a3b8"
          keyboardType="numeric"
          value={nim}
          onChangeText={setNim}
        />
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Nama Lengkap</Text>
        <TextInput
          style={styles.input}
          placeholder="Contoh: Rina Melati"
          placeholderTextColor="#94a3b8"
          value={nama}
          onChangeText={setNama}
        />
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Program Studi</Text>
        <TextInput
          style={styles.input}
          placeholder="Contoh: Sistem Informasi / Teknik Informatika"
          placeholderTextColor="#94a3b8"
          value={prodi}
          onChangeText={setProdi}
        />
      </View>

      {/* Pilihan Status Mahasiswa (Tantangan 2) */}
      <View style={styles.formGroup}>
        <Text style={styles.label}>Status Mahasiswa</Text>
        <View style={styles.statusContainer}>
          <TouchableOpacity
            style={[styles.statusButton, status === "Aktif" && styles.statusButtonActive]}
            onPress={() => setStatus("Aktif")}
            activeOpacity={0.8}
          >
            <Ionicons 
              name={status === "Aktif" ? "radio-button-on" : "radio-button-off"} 
              size={18} 
              color={status === "Aktif" ? "#16a34a" : "#64748b"} 
            />
            <Text style={[styles.statusText, status === "Aktif" && styles.statusTextActive]}>Aktif</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.statusButton, status === "Cuti" && styles.statusButtonCutiActive]}
            onPress={() => setStatus("Cuti")}
            activeOpacity={0.8}
          >
            <Ionicons 
              name={status === "Cuti" ? "radio-button-on" : "radio-button-off"} 
              size={18} 
              color={status === "Cuti" ? "#dc2626" : "#64748b"} 
            />
            <Text style={[styles.statusText, status === "Cuti" && styles.statusTextCutiActive]}>Cuti</Text>
          </TouchableOpacity>
        </View>
      </View>

      <TouchableOpacity style={styles.submitButton} onPress={handleSimpan} activeOpacity={0.8}>
        <Ionicons name="save-outline" size={18} color="#ffffff" style={{ marginRight: 6 }} />
        <Text style={styles.submitButtonText}>Simpan Data Mahasiswa</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f8fafc" },
  content: { padding: 18 },
  title: { fontSize: 16, fontWeight: "bold", color: "#0f172a" },
  subtitle: { fontSize: 12, color: "#64748b", marginTop: 4, marginBottom: 20 },
  formGroup: { marginBottom: 16 },
  label: { fontSize: 12.5, fontWeight: "600", color: "#334155", marginBottom: 6 },
  input: {
    backgroundColor: "#ffffff",
    borderWidth: 1,
    borderColor: "#cbd5e1",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 13.5,
    color: "#0f172a",
  },
  statusContainer: {
    flexDirection: "row",
    gap: 12,
  },
  statusButton: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#ffffff",
    borderWidth: 1,
    borderColor: "#cbd5e1",
    borderRadius: 8,
    paddingVertical: 10,
    gap: 8,
  },
  statusButtonActive: {
    backgroundColor: "#dcfce7",
    borderColor: "#16a34a",
  },
  statusButtonCutiActive: {
    backgroundColor: "#fee2e2",
    borderColor: "#dc2626",
  },
  statusText: {
    fontSize: 13,
    fontWeight: "500",
    color: "#64748b",
  },
  statusTextActive: {
    color: "#16a34a",
    fontWeight: "bold",
  },
  statusTextCutiActive: {
    color: "#dc2626",
    fontWeight: "bold",
  },
  submitButton: {
    flexDirection: "row",
    backgroundColor: "#072deb",
    borderRadius: 8,
    paddingVertical: 12,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
    shadowColor: "#072deb",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 2,
  },
  submitButtonText: {
    color: "#ffffff",
    fontSize: 14,
    fontWeight: "bold",
  },
});