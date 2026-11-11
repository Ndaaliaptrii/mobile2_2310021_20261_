import { TopTabs } from "expo-router/js-top-tabs";
import { Ionicons } from "@expo/vector-icons";
import { MahasiswaProvider } from "../../context/MahasiswaContext"; // Sesuaikan path lokasi file MahasiswaContext Anda

export default function MahasiswaTopTabsLayout() {
  return (
    <MahasiswaProvider>
      <TopTabs
        screenOptions={{
          // 1. Warna teks tab yang sedang aktif
          tabBarActiveTintColor: "#eb078c",

          // 2. Warna teks tab yang tidak aktif
          tabBarInactiveTintColor: "#a31068",

          // 3. Penataan garis indikator berjalan di bawah tab aktif
          tabBarIndicatorStyle: {
            backgroundColor: "#eb078c",
            height: 3,
          },

          // 4. Gaya font label teks tab
          tabBarLabelStyle: {
            fontSize: 12,
            fontWeight: "bold",
            textTransform: "none", // Mempertahankan huruf besar-kecil asli
          },

          // 5. Gaya bilah fisik tab bar atas
          tabBarStyle: {
            backgroundColor: "#ffffff",
            elevation: 2,
            shadowOpacity: 0.08,
          },
        }}
      >
        {/* Tab 1: Halaman Data Mahasiswa */}
        <TopTabs.Screen
          name="index"
          options={{
            title: "Data",
            tabBarIcon: ({ color, focused }) => (
              <Ionicons
                name={focused ? "list" : "list-outline"}
                size={18}
                color={color}
              />
            ),
          }}
        />

        {/* Tab 2: Halaman Input Mahasiswa */}
        <TopTabs.Screen
          name="input"
          options={{
            title: "Input",
            tabBarIcon: ({ color, focused }) => (
              <Ionicons
                name={focused ? "add-circle" : "add-circle-outline"}
                size={18}
                color={color}
              />
            ),
          }}
        />

        {/* Tab 3: Halaman Laporan / Report */}
        <TopTabs.Screen
          name="report"
          options={{
            title: "Report",
            tabBarIcon: ({ color, focused }) => (
              <Ionicons
                name={focused ? "bar-chart" : "bar-chart-outline"}
                size={18}
                color={color}
              />
            ),
          }}
        />
      </TopTabs>
    </MahasiswaProvider>
  );
}