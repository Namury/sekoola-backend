import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
    const admin1 = await prisma.sekolah.upsert({
        where: { email: 'admin1@sekolah1.com' },
        update: {},
        create: {
            email: 'admin1@sekolah1.com',
            nama: 'sekolah1',
            password: "$2a$08$Laex.0Y2gHmbgDeI1ARLGOHl8bwMUIKXKUdrZBz9oJYDiJBbaewAS",
            tingkatan: {
                create: {
                    nama: "Kelas 1",
                    // sekolahId: 1,
                    mataPelajaran: {
                        create: [
                            {
                                nama: "Matematika",
                                
                                // tingkatanId: 1,
                            },
                            {
                                nama: "IPA",
                                // tingkatanId: 1,
                            },
                            {
                                nama: "Bahasa Inggris",
                                // tingkatanId: 1,
                            },
                        ]
                    },
                    kelas: {
                        create:[ 
                            {
                                nama: "Kelas 1A",
                                // tingkatanId: 1,
                            },
                            {
                                nama: "Kelas 1B",
                                // tingkatanId: 1,
                            },
                            {
                                nama: "Kelas 1C",
                                // tingkatanId: 1,
                            },
                            {
                                nama: "Kelas 1D",
                                // tingkatanId: 1,
                            },
                        ]
                    }
                }
            }
        } 
    })


  console.log({ admin1 })
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })