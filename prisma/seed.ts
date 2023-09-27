import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

/**
 * Seed the database with blood types
 */
const seedBloodTypes = () => {
  return prisma.bloodType.createMany({
    data: [
      { type: "A+" },
      { type: "A-" },
      { type: "B+" },
      { type: "B-" },
      { type: "AB+" },
      { type: "AB-" },
      { type: "O+" },
      { type: "O-" },
    ],
    skipDuplicates: true,
  })
}

/**
 * Seed the database with military forces
 */
const seedMilitaryForces = () => {
  return prisma.militaryForce.createMany({
    data: [
      {
        name: "Ejército Nacional de Colombia",
        countryId: 1,
        image_url:
          "https://res.cloudinary.com/di3jir3qe/image/upload/v1695681178/military-forces/ejercito-nacional-colombia/800px-Escudo_Ejercito_Nacional_de_Colombia_uaou13.png",
      },
      {
        name: "Armada Nacional de Colombia",
        countryId: 1,
        image_url:
          "https://res.cloudinary.com/di3jir3qe/image/upload/v1695676650/military-forces/Escudo_Armada_Nacional_de_Colombia_czus5k.png",
      },
      {
        name: "Fuerza Aeroespacial Colombiana",
        countryId: 1,
        image_url: "https://res.cloudinary.com/di3jir3qe/image",
      },
    ],
    skipDuplicates: true,
  })
}

/**
 * Seed the database with military ranks
 */
const seedRanks = () => {
  const ranksAndGrades = [
    {
      name: "Soldado",
      MilitaryForce: {
        connect: { name: "Ejército Nacional de Colombia" },
      },
      MilitaryGrade: {
        createMany: {
          data: [
            {
              name: "Soldado",
              abbreviation: "SR",
              image_url:
                "https://res.cloudinary.com/di3jir3qe/image/upload/v1695681247/military-forces/ejercito-nacional-colombia/grades/soldados/SL_zroljt.png",
            },
            {
              name: "Dragoneante",
              abbreviation: "DG",
              image_url:
                "https://res.cloudinary.com/di3jir3qe/image/upload/v1695681294/military-forces/ejercito-nacional-colombia/grades/soldados/Dragoneante_Ej%C3%A9rcito_awibnc.png",
            },
            {
              name: "Soldado Profesional",
              abbreviation: "SLP",
              image_url:
                "https://res.cloudinary.com/di3jir3qe/image/upload/v1695681293/military-forces/ejercito-nacional-colombia/grades/soldados/Rank_insignia_of_soldado_profesional_of_the_Colombian_Army_f4acdd.png",
            },
            {
              name: "Dragoneante Profesional",
              abbreviation: "DGP",
              image_url:
                "https://res.cloudinary.com/di3jir3qe/image/upload/v1695681292/military-forces/ejercito-nacional-colombia/grades/soldados/DGP_EJECOL_zr5d2k.png",
            },
          ],
          skipDuplicates: true,
        },
      },
    },
    {
      name: "Suboficial",
      MilitaryForce: {
        connect: { name: "Ejército Nacional de Colombia" },
      },
      MilitaryGrade: {
        createMany: {
          data: [
            {
              name: "Sargento Mayor de Comando Conjunto",
              abbreviation: "SMCC",
              image_url:
                "https://res.cloudinary.com/di3jir3qe/image/upload/v1695827037/military-forces/ejercito-nacional-colombia/grades/suboficiales/Sargento_Mayor_de_Comando_Conjunto_EJC_oapgme.svg",
            },
            {
              name: "Sargento Mayor de Ejército",
              abbreviation: "SME",
              image_url:
                "https://res.cloudinary.com/di3jir3qe/image/upload/v1695827037/military-forces/ejercito-nacional-colombia/grades/suboficiales/Sargento_Mayor_de_Ej%C3%A9rcito_EJC_ytir4o.svg",
            },
            {
              name: "Sargento Mayor de Comando",
              abbreviation: "SMC",
              image_url:
                "https://res.cloudinary.com/di3jir3qe/image/upload/v1695827036/military-forces/ejercito-nacional-colombia/grades/suboficiales/Sargento_Mayor_de_Comando_EJC_j8phir.svg",
            },
            {
              name: "Sargento Mayor",
              abbreviation: "SM",
              image_url:
                "https://res.cloudinary.com/di3jir3qe/image/upload/v1695827037/military-forces/ejercito-nacional-colombia/grades/suboficiales/Sargento_Mayor_de_Ej%C3%A9rcito_EJC_ytir4o.svg",
            },
            {
              name: "Sargento Primero",
              abbreviation: "SP",
              image_url:
                "https://res.cloudinary.com/di3jir3qe/image/upload/v1695827036/military-forces/ejercito-nacional-colombia/grades/suboficiales/Sargento_Primero_EJC_wk2d46.svg",
            },
            {
              name: "Sargento Viceprimero",
              abbreviation: "SV",
              image_url:
                "https://res.cloudinary.com/di3jir3qe/image/upload/v1695827036/military-forces/ejercito-nacional-colombia/grades/suboficiales/Sargento_Viceprimero_EJC_kwgglx.svg",
            },
            {
              name: "Sargento Segundo",
              abbreviation: "SS",
              image_url:
                "https://res.cloudinary.com/di3jir3qe/image/upload/v1695827036/military-forces/ejercito-nacional-colombia/grades/suboficiales/Sargento_Segundo_EJC_pcqx5z.svg",
            },
            {
              name: "Cabo Primero",
              abbreviation: "CP",
              image_url:
                "https://res.cloudinary.com/di3jir3qe/image/upload/v1695827036/military-forces/ejercito-nacional-colombia/grades/suboficiales/Cabo_Primero_EJC_bwg0dc.svg",
            },
            {
              name: "Cabo Segundo",
              abbreviation: "CS",
              image_url:
                "https://res.cloudinary.com/di3jir3qe/image/upload/v1695827037/military-forces/ejercito-nacional-colombia/grades/suboficiales/Cabo_Segundo_EJC_ogdetj.svg",
            },
            {
              name: "Cabo Tercero",
              abbreviation: "C3",
              image_url:
                "https://res.cloudinary.com/di3jir3qe/image/upload/v1695827037/military-forces/ejercito-nacional-colombia/grades/suboficiales/Cabo_Tercero_EJC_lqah35.svg",
            },
            {
              name: "Dragoneante EMSUB",
              abbreviation: "DG",
              image_url:
                "https://res.cloudinary.com/di3jir3qe/image/upload/v1695827039/military-forces/ejercito-nacional-colombia/grades/suboficiales/Dragoneante_Escuela_Militar_de_Suboficiales_Sargento_Inocencio_Chinc%C3%A1_fm9q3l.png",
            },
            {
              name: "Alumno EMSUB",
              abbreviation: "AL",
              image_url:
                "https://res.cloudinary.com/di3jir3qe/image/upload/v1695827038/military-forces/ejercito-nacional-colombia/grades/suboficiales/Alumno_EMSUB_EJC_jsgmhc.png",
            },
          ],
          skipDuplicates: true,
        },
      },
    },
    {
      name: "Oficial",
      MilitaryForce: {
        connect: { name: "Ejército Nacional de Colombia" },
      },
      MilitaryGrade: {
        createMany: {
          data: [
            {
              name: "General de Ejército",
              abbreviation: "GDE",
              image_url:
                "https://res.cloudinary.com/di3jir3qe/image/upload/v1695827354/military-forces/ejercito-nacional-colombia/grades/oficiales/GR_EJERCOL_N%C2%BA3_ortr1n.svg",
            },
            {
              name: "Mayor General",
              abbreviation: "MG",
              image_url:
                "https://res.cloudinary.com/di3jir3qe/image/upload/v1695827353/military-forces/ejercito-nacional-colombia/grades/oficiales/MG_EJERCOL_N%C2%BA3_almwkc.svg",
            },
            {
              name: "Brigadier General",
              abbreviation: "BG",
              image_url:
                "https://res.cloudinary.com/di3jir3qe/image/upload/v1695827353/military-forces/ejercito-nacional-colombia/grades/oficiales/BG_EJERCOL_N%C2%BA3_q01ofo.svg",
            },
            {
              name: "Coronel",
              abbreviation: "CR",
              image_url:
                "https://res.cloudinary.com/di3jir3qe/image/upload/v1695827350/military-forces/ejercito-nacional-colombia/grades/oficiales/CR_EJERCOL_N%C2%BA3_acojck.svg",
            },
            {
              name: "Teniente Coronel",
              abbreviation: "TC",
              image_url:
                "https://res.cloudinary.com/di3jir3qe/image/upload/v1695827350/military-forces/ejercito-nacional-colombia/grades/oficiales/TC_EJERCOL_N%C2%BA3_tf72xx.svg",
            },
            {
              name: "Mayor",
              abbreviation: "MY",
              image_url:
                "https://res.cloudinary.com/di3jir3qe/image/upload/v1695827351/military-forces/ejercito-nacional-colombia/grades/oficiales/MY_EJERCOL_N%C2%BA3_qmip4l.svg",
            },
            {
              name: "Capitán",
              abbreviation: "CT",
              image_url:
                "https://res.cloudinary.com/di3jir3qe/image/upload/v1695827349/military-forces/ejercito-nacional-colombia/grades/oficiales/CT_EJERCOL_N%C2%BA3_gssnux.svg",
            },
            {
              name: "Teniente",
              abbreviation: "TE",
              image_url:
                "https://res.cloudinary.com/di3jir3qe/image/upload/v1695827348/military-forces/ejercito-nacional-colombia/grades/oficiales/TE_EJERCOL_N%C2%BA3_jcsncy.svg",
            },
            {
              name: "Subteniente",
              abbreviation: "ST",
              image_url:
                "https://res.cloudinary.com/di3jir3qe/image/upload/v1695827349/military-forces/ejercito-nacional-colombia/grades/oficiales/ST_EJERCOL_N%C2%BA3_dqobaa.svg",
            },
            {
              name: "Alférez",
              abbreviation: "AF",
              image_url: "",
            },
            {
              name: "Cadete",
              abbreviation: "CD",
              image_url: "",
            },
          ],
          skipDuplicates: true,
        },
      },
    },
  ]

  return ranksAndGrades.map(async (rank) =>
    prisma.militaryRank.create({ data: rank }),
  )
}

async function seedInstallations() {
  return prisma.militaryInstallation.create({
    data: {
      name: "Batallón de Infantería No. 1 General Simón Bolívar",
      MilitaryForce: {
        connect: { name: "Ejército Nacional de Colombia" },
      },
    },
  })
}

async function seedRoles() {
  return prisma.role.createMany({
    data: [{ name: "ADMIN" }, { name: "USER" }, { name: "STAFF" }],
    skipDuplicates: true,
  })
}

async function main() {
  return await Promise.all([
    seedBloodTypes(),
    seedMilitaryForces(),
    seedRanks(),
    seedInstallations(),
    seedRoles(),
  ])
}

main()
  .then(() => console.log("Seeding complete 🌱"))
  .catch(() => console.error("Seeding failed 💀"))
  .finally(() => prisma.$disconnect())
