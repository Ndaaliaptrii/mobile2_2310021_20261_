import React, { useState } from "react";
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Alert, TextInput } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useMahasiswa } from "../../context/MahasiswaContext"; // Impor custom hook Context

export default function DataMahasiswaScreen() {
  // Mengambil data terpusat dan fungsi hapus dari Context
  const { dataMahasiswa, hapusMahasiswa } = useMahasiswa();

  // State untuk menangkap teks pencarian
  const [searchQuery, setSearchQuery] = useState("");

  const handleHubungi = (nama: string) => {
    Alert.alert("Hubungi Mahasiswa", `Menghubungi mahasiswa atas nama ${nama}`);
  };

  const konfirmasiHapus = (id: string, nama: string) => {
    Alert.alert("Konfirmasi Hapus", `Apakah Anda yakin ingin menghapus data ${nama}?`, [
      { text: "Batal", style: "cancel" },
      { text: "Hapus", style: "destructive", onPress: () => hapusMahasiswa(id) },
    ]);
  };

  // Menyaring data mahasiswa berdasarkan Nama atau NIM secara real-time
  const filteredData = dataMahasiswa.filter((item) => {
    const query = searchQuery.toLowerCase();
    return (
      item.nama.toLowerCase().includes(query) ||
      item.nim.toLowerCase().includes(query)
    );
  });

  return (
    <View style={styles.container}>
      {/* Kolom Pencarian / Search Bar (Tantangan 3) */}
      <View style={styles.searchContainer}>
        <Ionicons name="search" size={18} color="#64748b" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Cari berdasarkan nama atau NIM..."
          placeholderTextColor="#94a3b8"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        {searchQuery.length > 0 && (
          <TouchableOpacity onPress={() => setSearchQuery("")}>
            <Ionicons name="close-circle" size={18} color="#94a3b8" />
          </TouchableOpacity>
        )}
      </View>

      <FlatList
        data={filteredData} // Menggunakan data yang sudah difilter
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listArea}
        ListEmptyComponent={
          <View style={styles.emptyBox}>
            <Ionicons name="search-outline" size={36} color="#cbd5e1" style={{ marginBottom: 6 }} />
            <Text style={styles.emptyText}>Data mahasiswa tidak ditemukan.</Text>
            <Text style={styles.emptySubText}>Coba kata kunci lain atau tambahkan data baru.</Text>
          </View>
        }
        renderItem={({ item }) => (
          <View style={styles.card}>
            {/* Avatar Inisial */}
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>{item.nama.charAt(0)}</Text>
            </View>

            {/* Informasi Identitas */}
            <View style={styles.infoArea}>
              <View style={styles.topInfoRow}>
                <Text style={styles.nama}>{item.nama}</Text>
                {/* Badge Status */}
                <View style={[styles.badge, item.status === "Aktif" ? styles.badgeActive : styles.badgeInactive]}>
                  <Text style={[styles.badgeText, item.status === "Aktif" ? styles.badgeTextActive : styles.badgeTextInactive]}>
                    {item.status}
                  </Text>
                </View>
              </View>

              <Text style={styles.subText}>NIM: {item.nim}</Text>
              <Text style={styles.prodiText}>{item.prodi}</Text>
            </View>

            {/* Tombol Aksi Cepat (Hubungi & Hapus) */}
            <View style={styles.actionContainer}>
              <TouchableOpacity 
                style={styles.actionButton} 
                onPress={() => handleHubungi(item.nama)}
                activeOpacity={0.7}
              >
                <Ionicons name="call" size={16} color="#072deb" />
              </TouchableOpacity>

              <TouchableOpacity 
                style={[styles.actionButton, styles.deleteButton]} 
                onPress={() => konfirmasiHapus(item.id, item.nama)}
                activeOpacity={0.7}
              >
                <Ionicons name="trash-outline" size={16} color="#dc2626" />
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8fafc",
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#ffffff",
    marginHorizontal: 16,
    marginTop: 16,
    marginBottom: 4,
    paddingHorizontal: 12,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#e2e8f0",
    height: 44,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 13.5,
    color: "#0f172a",
  },
  listArea: {
    padding: 16,
    gap: 12,
  },
  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#ffffff",
    padding: 14,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#e2e8f0",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  avatar: {
    width: 46,
    height: 46,
    borderRadius: 23,
    backgroundColor: "#eff6ff",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  avatarText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#072deb",
  },
  infoArea: {
    flex: 1,
  },
  topInfoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  nama: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#0f172a",
  },
  subText: {
    fontSize: 11.5,
    color: "#64748b",
    marginTop: 2,
  },
  prodiText: {
    fontSize: 12,
    color: "#072deb",
    marginTop: 2,
    fontWeight: "500",
  },
  badge: {
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  badgeActive: {
    backgroundColor: "#dcfce7",
  },
  badgeInactive: {
    backgroundColor: "#fee2e2",
  },
  badgeText: {
    fontSize: 10,
    fontWeight: "bold",
  },
  badgeTextActive: {
    color: "#16a34a",
  },
  badgeTextInactive: {
    color: "#dc2626",
  },
  actionContainer: {
    flexDirection: "column",
    gap: 8,
    marginLeft: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  actionButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#eff6ff",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#dbeafe",
  },
  deleteButton: {
    backgroundColor: "#fee2e2",
    borderColor: "#fecaca",
  },
  emptyBox: { 
    alignItems: "center", 
    marginTop: 40 
  },
  emptyText: { 
    fontSize: 14, 
    fontWeight: "bold", 
    color: "#64748b" 
  },
  emptySubText: { 
    fontSize: 12, 
    color: "#94a3b8", 
    marginTop: 4 
  },
});