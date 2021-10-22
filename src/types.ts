export type Auth = { email: string; password: string };

export type Sekolah = {
    nama: string,
    email: string,
    password: string,
}

export type Tingkatan = {
    nama: string,
    urutan: number,
    sekolahId: number,  
}

export type Kelas = {
    nama: string,
    urutan: number,
    tingkatanId: number
}

export type Siswa = {
    nama: string,
    NISN: string,
    kelasId: number,
    sekolahId: number,
}

export type MataPelajaran = {
    nama: string,
    tingkatanId: number,
    guruId: number
}

export type Guru = {
    nama: string,
    NIP: string,
    sekolahId: number
}