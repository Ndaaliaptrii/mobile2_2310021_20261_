import React, { createContext, useContext, useState } from "react";
import { Alert } from "react-native"; // Pastikan Alert diimpor dari react-native

export interface Mahasiswa {
  id: string;
  nim: string;
  nama: string;
  prodi: string;
  status: "Aktif" | "Cuti";
}

interface MahasiswaContextType {
  dataMahasiswa: Mahasiswa[];
  tambahMahasiswa: (mhs: Omit<Mahasiswa, "id">) => void;
  hapusMahasiswa: (id: string) => void;
}

const MahasiswaContext = createContext<MahasiswaContextType | undefined>(undefined);

const DATA_AWAL: Mahasiswa[] = [
  { id: "1", nim: "230101001", nama: "Ahmad Fauzi", prodi: "Teknik Informatika", status: "Aktif" },
  { id: "2", nim: "230101002", nama: "Budi Santoso", prodi: "Sistem Informasi", status: "Aktif" },
  { id: "3", nim: "230101003", nama: "Citra Dewi", prodi: "Teknik Informatika", status: "Aktif" },
  { id: "4", nim: "230101004", nama: "Dedi Kurniawan", prodi: "Sistem Informasi", status: "Cuti" },
  { id: "5", nim: "230101005", nama: "Eka Rahmawati", prodi: "Sistem Informasi", status: "Aktif" }
];

export const MahasiswaProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [dataMahasiswa, setDataMahasiswa] = useState<Mahasiswa[]>(DATA_AWAL);

  const tambahMahasiswa = (mhs: Omit<Mahasiswa, "id">) => {
    // 1. Validasi apakah NIM sudah terdaftar sebelumnya
    const nimSudahAda = dataMahasiswa.some((item) => item.nim === mhs.nim);

    if (nimSudahAda) {
      // 2. Tampilkan pesan peringatan jika NIM duplikat
      Alert.alert("Gagal", "NIM sudah terdaftar!");
      return; // Batalkan penyimpanan
    }

    // Jika belum ada, lanjutkan proses penambahan data baru
    const mahasiswaBaru: Mahasiswa = {
      ...mhs,
      id: Date.now().toString(),
    };
    setDataMahasiswa((prev) => [mahasiswaBaru, ...prev]);
  };

  const hapusMahasiswa = (id: string) => {
    setDataMahasiswa((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <MahasiswaContext.Provider value={{ dataMahasiswa, tambahMahasiswa, hapusMahasiswa }}>
      {children}
    </MahasiswaContext.Provider>
  );
};

export const useMahasiswa = () => {
  const context = useContext(MahasiswaContext);
  if (!context) {
    throw new Error("useMahasiswa harus digunakan di dalam MahasiswaProvider");
  }
  return context;
};