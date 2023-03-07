import { PrismaClient } from '@prisma/client';
import dayjs from 'dayjs';
const prisma = new PrismaClient();

async function main() {
  let event = await prisma.event.findFirst();
  if (!event) {
    event = await prisma.event.create({
      data: {
        title: 'Driven.t',
        logoImageUrl: 'https://files.driveneducation.com.br/images/logo-rounded.png',
        backgroundImageUrl: 'linear-gradient(to right, #FA4098, #FFD77F)',
        startsAt: dayjs().toDate(),
        endsAt: dayjs().add(21, 'days').toDate(),
      },
    });
  }

  await prisma.ticketType.create({
    data: {
      name: 'remote',
      price: 100,
      isRemote: true,
      includesHotel: false,
    },
  });

  await prisma.ticketType.create({
    data: {
      name: 'presencialSemHotel',
      price: 250,
      isRemote: false,
      includesHotel: false,
    },
  });

  await prisma.ticketType.create({
    data: {
      name: 'presencialComHotel',
      price: 600,
      isRemote: false,
      includesHotel: true,
    },
  });

  await prisma.hotel.createMany({
    data: [
      {id:1, name: 'Drivent Resort', image:'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgHBgkIBwgKCgkLDRYPDQwMDRsUFRAWIB0iIiAdHx8kKDQsJCYxJx8fLT0tMTU3Ojo6Iys/RD84QzQ5OjcBCgoKDQwNGg8PGjclHyU3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3N//AABEIAHoAtwMBIgACEQEDEQH/xAAbAAABBQEBAAAAAAAAAAAAAAADAQIEBQYAB//EAD8QAAIBAwMCBAQEAwQJBQAAAAECAwAEEQUSITFBBhMiUWFxgZEUIzKhFcHwQrHR8QcWJDNSYoLC4SU0kqKy/8QAGwEAAgMBAQEAAAAAAAAAAAAAAQQAAgMFBgf/xAAxEQABBAAEBAQFAwUAAAAAAAABAAIDEQQSITEFEyJBUaHR8DJhcZHhFIHBFSMzUrH/2gAMAwEAAhEDEQA/AMgRSYohFdtzXrl5S0LFLtogWl21FLQttdtomK7bRUzJmK7FE212KlIWhgUuKIBXYqUpaYBTsU4LTsVKVSU0CngUoWnAUaVCUgFFVeKaBRFFBAFPReKKq0ijZEZJGCIOrscAfWomqamLBhFBbPcTsxQFvSuR7d2pWXFRx6E6+Cfhw0kgsDTxVrBbySxyyRplYl3OfYZA/nSqKsv9GlrqlzrEq67GVtrqFo1jIAABVs8Dkde/PFBv7OSwvp7SX9cLlSff2P1HNZYfE81xBFLefDcoAg2o6ijLTVFEUU0lk5KWnKKSpaFLJYp6Lk0QxGnIhU1YlLgG1f8AhLQoNbvJoJQw227umwhTvGMcmpmr+GbKFJJZ4LvRthG5pQbiDk4HqHqX7GrL/R3BI8l8ImCSfhSA5HCkkVZTanr+mQN/ENPjvoN20+TlG+YIJrgYvFyxz9BNL0eHwkL4eoBed3eg30EBuY0S6tO1zauJUPzI5H1AqtCZHHPyr0SzvfDd3qhvba7l0u9ZSAkibApOOdy/93vRpPDNzeMXvYbXUYSMrdwkQynkD9Selv8AqXtTEHF70kH29ErNwkjWM/f1Xmu2u21obnQoHmMVleETnJW2vE8pjjrh+Uboe4qsvbC5sZBHeQSQMRld4wGHuD0P0rqxYmGX4D6rlSwSxfG1QQtLto2yl2cA+4zW9JbMghacFom2lC849+lTZDNaHtpwFHdIra5t4L6dbZ52VY1YEsckDO0cgc9TR7NbuO93vYRQaeqNuu7iUckrxjpjk54B6UnNjYo9BqU7DgJpdSKHvsgx2zY3SDYm0tls5wOpAHJqPp99+M1H8LZWM8wXcHmcY2HBxx0HOOtAs30qyvHmhml1bUWVgZJGKJjHIyeT/ca5LrxBq0xhhtmi08OVcRARRAZwTu4J+efpXIlx8kujdvl6rsw8Pii3399kK60uBbjzvEmrmaVSdttCNzftwv2+tSNS8STWaL+Cs1tQTtWWTDyHj7D61XtpOk2kkjajqpuAGOLe0XOB23OeKsL3XZrKJTp1jDa5YKrkiWTkZGCeKSzEmv8AnqnqA/K0H+jEau3iq3vdQhnEMqMgkmODuJBAA9uvatf/AKRLFkv4bwLhJV8tiO5HIP2P/wBaw/gP+MyeKLC+1GG48oyKnmS8Yyw6Dj9hXq/jSIXOgTPwyoySRn2OcH9ifvTGGcY5m6Ul8S0SRkbrzVRRFFKoooWu/a4SRV4rqMiV1S0VnDFSeXzU0IGXIpYot0qD/mFYtma5mZpsK/JIdlO613gyzK2Wri4kNurpGgkXquS3P3AqVLb+JrC38yzvYtQhzzHMAVI+eM12lyWUegXp1fDW0syxtlSeQOOlVraPosgV9A1owT5z+XcLGxH/AFYrzUruZJZXpWs5bcqbcahbzrKuveG5ICV9c1s24EZ/4f8AA1G0m10fzmm0HxC0Lkj8pnMTZz33HB4+OKshH4vskd2uYr+EbQgubcEEHOfUMn9+9VVhrFlqTXkl34eYGMhZpraUnacN/ZPyPGfaqPvv6+YUaR29/dT7i6121YDXtHgv49p/2hfy2PGD6lGDkHHeo1nc6ELK6jsLm5053AYQXMW6IEdsEFOcjqBUfTW0u3uDHoniK5098f8At7kOgTpgkHIPyJqy1Cx1K80qQajp9hrMAbINtiJm6erKnAP07US4jb1/KFX79hZOObTb9Btt5YyxAFzaIRGckAflOfc9Aw+VLNpN4uoPbweTdCMAbEOJQepzGSD36jI+NPs4dNgvrdoby90hY2XyPxMRkO4/qGU9gRjI5z8K0Uc2pyXck09rZapAkZ8u9hYCTkYwwQ9z7rWsXEMSAWl2nv8AdLuwEF5i0X7/AGWaFrCz2w5fzZvKdLbEhU7gCevGARnrTLpUs4bmPULiOxBcCP8ADFpJ9oz+rHTPHUjGKnT3Mggt49T1NNPUShDp1sm5mXcMAlSTz09RHWq+005BHM2kaO7RyHImvXLx8Z/srxxnuT1rV2OkkGUnRAYOGN2ZrdVFS+nmls00TSWm8uJEW8k/NdUGPf0ofv0qNdWgbU1l1XWvPdQf9niXzn5HIyPStE1Qyu9vHquvQQqMD8NCBKuQegVAFA+ZqO8mnQatHHBpksk54WS4kwq8Hoif3ZNZ3Z8fP8LTYex+UHTb2yjvjBoumAXHOJ7gGZweei9B9KLeWWtXF4G1m9SGBZAR+JkGXAPaMf4CpVsniKaUrNH+CsDkNsC264x78E9u5qvm07Sre9M1zrUf6wyx26tIT8M8D75qEa9Xn6BEXXT5epUaePw7bTOZJLq/fJIjAMKAe3OW/arK81W+tbaJ9NgtrYOVVBGm5+Rn9TZPQe2ajXN7o1vdyiLSLi4mz6jcSlR0/wCFeD9TU6fVtTGnxvp7R2u6NCIbeFcgH+z3PHwo7gVZ8lNr2HmUXwvba4+v2V/fxzmJJPU8vGP/AJHP2r1USNL4f1S1dyxjj3LnpgHJryDR7PX5dYsry5iuZYUmDO0i4Cr7+o579q9atAJHukz65bSVce/Gf76ZjbV6VVFLyOJ73eiyqpRkjrppYbVA9w4RT70ODUrWZSYpVY9gp5rsGQLk5ChXmp2diCJpCXzjYgLN9hS1njd2q6vbhoiZAjMwfof65rqSdiJLNEJjktAU7RszwAFlZzjKoo6/DFWcdu0cyF1KgHuDVCI7lLeFmlLou7DZXA9ugH9cfO8e+uLqyVYbmVpEQeW8hBUDqBjGf37exrhw8UyM5Tvuuu7ADPmWusbn8F4cMrWUl1E0xEiIA2Fx3BIqk1C58L36L5lpNasgOS9k8o5x1Kk46VQ6l4mkS0sbWWR7Xy/MLNFL+skrnp7ZH9GpaeMJpbI2rxSTSRrgXG/zCV9sbRnoec0uzEtza7LeRpNqRBp2kpBI3h7Xobe4P6Vju2jw2OMh+nfipmnR+MhZXbXU8d3tB2RsscwlXaf7S8/DqOtYi7v57zz5Y7Ty4jKfVswZGIGVIPyI4yeam6R/B7exlgdZI72TMm+GQr5eUHAz7EVHYlt0RSq0UrtNSki00NqvhmGKLaRsSVkZPVjGxww+PtQYI9GXSZbiznv9Mm83i7liDbOVyv5Z6deg71LF2trpKy2fieVn2gPG1x5rAk8Eo378Yp1pqF9c6DM0lxpt4UJd0nt0jBXufRg5yOvyrV0rCQ2/5QArVCguNRnntRbappupIZPzZLzZk4IwwDgNx8PbpUa9ttupXD3Xh5rdirYu4pG8uXjHAZTz8Q1FtrRLie1mPh6G4VZjtaG7YInI6bg2QcZ+FU6tYJrV/wDhHvoG9fmRkoyI3OQu0r8OoosGqs46KTp0d1DpiLBbWmmRiUkLfLvcjuVLADn5VEl/BXtndR3uo3eozRnkWyl0jHbC7VA79CaHpJs18tYbF7p5JNxe+ZRk9dw9LHHccjtU+S21KAyPDp1hayEExMnqZsH/AJz15Hapsjaj28xluLe30rRYVmVOHup9hwBjlOBnB6DPy70O4j8RC8Ux7bW0P6yqJBnr/aJB9u5qVfNcMynUPEb24wfMR5olMh9vy24+1VN1aaWNSjke+VpMjbstpZDnJ74A+/tWjTos3BAhsbVb1ZNQ1iCS43ena7TtjnIwB7e5pk/8Ht9TZ839xcsV9KRpGM4Hc5PQU23Gix6ovlyX80hkPAjSNd2Tn3NLqF9p1vqG9dGaabjDSXr46DsoA6VU91azam3V5KyGSPQrURxSYD3Mpkw20djjsB0FK2qak9lm1uxFlOYrWJQAc4OMDPT40aW/uhbSyrBplvDG6D1w7ycr15b5Ug1fUp7DMGoNnaeLeNQAc9go9u1aRW4eOqzk6TvWihWdlq11eQTz/wAQnEcySAyKVAAYHPNetaVIP4jACPU6soPzX/L7V5Ksep3bktJqk2MEbg6jOfkBXoK3Fyl3bfhT+Z5ibdw4U9On8qc+AHSksBnO5KiXOkrdXkM8jf7qNk2498c/tTJ9DjlHqG459LAYwPaoja1dW+pSQysHWKRty7QC21sHnt7cU3Wri9fVYG8iNra6UrFE/Khc7WUjueR8ORzWZ4rFZGXVQYB/istfeV/F23zKph9CbVyNvq5OPmPuK6n67Yppt/hUYTMS0kcgAXknkHnjIpa55xZecw7p0YZo0KubaKYRbhDKfUp/3RwDnOM+/Ao1/FcGyljj3RzGP0s3pwccc16Joxljk2hiY1QkknJxnv7nJ/c0Wy1f8TKvqURsxGDwepA/lS7cMAAbTfOO1Lw5NLeK8la5mEjjBTPq3/pLcEnGMY5PaptoGS5kMZYKMCQlwNobn5Y4HSvQ/FdumrG4MYijmiXbGzgckdCT8+n/AIrCWVjNG6v5EyBWZ3YZX1Enp9/24rHEAgalVDXPd0hBuLkQvEs0jMHQFJS362I43Bcdhzj2Hxp9ktzNqlvDGmXyBtZuVPTd059v3rX29tpz6ZDbXEll5uSEYKrYjxlc9eR/3VD0mGwRi8ohhnQqfOYj0BcYA+2fvVDDQHzRyOcbWS1IXA1m4sjEHiSQAKGCkH9PJx75/f6PvhFI8MVwkkqJ6Y9xB3c547jBIra+I/8AV53N6sdsZlG8+rAmwR8R7k/Ws9fWkEllDcKI4LlRzErZEmTz6s8cdvhVnxkOA+SrlsaBStJ3RRWxt3vEVHO2OG5ZQ68ccE56HrUy20rXtUklvvPu5IpAfLS4XO1T0IY5JHPWpXhuOzhjil1LzZbhSpURo5CYz7ZB4Pettpd5ay6dHBbb7eOOPywssTZAAwOuKZwoky24oSBo0rVeX3lve6UqQavqc6y79uwByCSAQBtwOhFVsMentazXNw80kfmMkjqvJI5xgnPbrWs8Zadf3mvPcQoJLchSCI8knYBwCwxWfbSb+MzWy6S0rSJuaYRKqkjOBjJ96vJCHmyss1IM9xZW2op+CjuY7iOPnDIAqZHTk5zkcDPShXN3YLNGt1blpGZeWutmWyccBf50V9Av0kRYdNWPyyCFaAtu68bgOnepf8M1H8TcNLpitvJjQm3ZtqkqQ+cc7Tu44zkdMUQ0g2DSBohZxr3S7bVUUaTa73dSJDeSSY3HuDjB55HanalrcMF3iDTdLEhC8vDuPPxJrR21heRvLFcWu6GWQurJasrRgK20k985Bx1GKrYG1Ireq1jdPKTttmS2IEZ3D9Xvxmtid9UKThrs6y3McN1bCONEMfk2oUyEkZ69OuBXf6w6jJYTOL2dXQyIy+WqsGGewHuKW5uLyJm8qTyZYyMwzMF3HPYE/Kl1CXUbqc3Vtu9bZ8uMbl3Hkg47Dkf0MBpVi0qNDLqGqWmpSxajfK9pD5mw7gWO4A46dj2+FbOSdINN068lKozXCrluDnarf41l7e61i0kulDSxxvbFN7wKQMkZUe/A/uqpvtTmm0v8IZXuDG4Z4xg7Xwckfc/Q1bObtDlhWeo3thbeMNSmc+ZGL2TftG4Bd7Y7j41qNRvIF0vTbsSJugvlVOf1BipGPmcfv7V52LOMwSt5jbVX9KResn2+Iotst3FpluRHJPIHdPIxw8eEOGB6Y5+Xv0xi1gacy07UtZ42mt5hpEb3DJdTWwwWU7Rtzk5zjJ+WfjXVkPEUDmOOaOG5nnICohbeIxyeW6f8XzJrqPJadQjnrdenad4fW2aVorgyEjndEhK8EZGMc8/t88rbeHLOQBUknk7je5b/APWaNba7Y24IQu7HrgY4+tBbxPawEC2i5PpGSc4/r403+kcuWeKxAboN3pmk2yyzXSSM3Rm3EE/QcVEtRoMH5UFm+VHAaRuAeeufjUHUNSmvpC8hwpbcFH+VRACGGWO48fH4Vv8A09hb1LmP4/M1/wDb2WruYdKe2FzNaxuHBwJCTwOBxXWH4DyYxHa2yKzhRGF6f0Ky0kryHLswA4GBwKNZ3EltKkpcZU+kZxg4+VW/QspUHHJc3yWlv76xtJTBb+UGB5xGuF74+wqtuteuVijSGQ5Kgu4AHc8YxVT5Zz5rNuz1Jxz8a4p0HU4GMHNbNwjAk5uLYh5OU0Fp9L1o+TCs7M7k5Yk9hk/4VorfUIRAuGAbZkj6VitPK+hdrlsMSEx/fmgTXEhl2+YWU9Npqn6RpOiZZxiSNgLtVYeJL0nVJGhYEEjn/pWoAu5GgfPUsO/wqMxZTmT6mosmoQJxuLD4Cm2wNAqlyX4yeR5cDurH8XOSPVj71IS/l3ykscFDjnvVE2qRjpG3Huan6XcJNMhuLWYQt/aBxj9uaLomAWQoyXFF26PPqzWtvISdzswKAn4H/EVRabrF5pt1LNG+7zF5U9M5zn4VrGbw20pDwbpB6cy7yP34qULHRJVJhsrUge0IJ/cUs5zKrKulBzBR5osLtL1yw1kLFd28Mk+3JjdF3H5Hoasj4d0O4OPwKB+pUMV/bcBVXJY6Yqj/ANPjAA7RL/hTG1MwJjzLxFUYB8tW/vFJOgs9AXZi4k1jalcL8Qp154G0maNtq3luxBUGOVyPqA1U0/ge9SRjZarOc9A2+LHXjp/OpVh4mU3UafxM7CSCj2381qXB4g1GZZDBdWE2zPG4oevHXpWZgeOyaZxCB2xVFdeG9ehikQQyzYX0FZ1YA8e/J79aptmrwHZe2UEUQJLBoFYnAGOn1rc3XijUrSOF5dKkkhdNzSRMHAIJyOPv9afZeNbO5AJhmHGduwnvjtmq8t47LVuKhcaDlhrW7i58+2tkWMZfYGDdhnavA5IHPOPbFdWn1G8XxRqNvEoaGzhRnLP1IzgN8AT0Hw+OK6qXS0Llm+AQu31YxgnvXOWZzkjAIwc5wcfSi42qrIoCv0JIP/mpWn2qT3R3NwFzjH+eK9CdBa+eMtxAUGKNXOFOGzyO/wBs0QwMrsmwg9eWx0+dTGUw3LKYSWU8B2yfr/lTXiDuXcbt7cqODj33HqKCJCiKhmACrwBlgM5H86IqlBksRkZKgfAcUSO3Vzv5wvAJI6/f4inMUgkZN29T02uQPngYqKVWpTL0oQOMs27jIP7hqeoUx5SPLZyDkf0e9PXEbFo2ddy7spnuPcimEkxiT6liF+XUYHv3zUUvuiRgozE44ByAQvz4/rrQ/wArAYlUUgZO7J+wNcNzRGbZ+X04Xg8465/o0krmIYl4DArhs+nHfr1ojRB2uhQje25yFlHPTK4yKDfPbrbNI8aMScKe5qouvy5GXt2+VRWcnvWlK7IBuEeMo0y7h6c8ge1XdhrV3p7/AJEm6I9Y26VnYmw+amBs8ig4AiityXMdbStbFrWj3rD8bbvBJjGQSyf+KuYYIpkH4O6DAZ24I9vavNmOaakskLbo3ZD7qcUq6H/Urdk7D/kYD5L0Y2l1CwKjeffPJqFdJdgoquYuTvLrkc/18azFp4n1S1wPPMijs1W9p43DYW7tQeeqms6kb2taGOB46XEfVGmto5wvmxNKQ2MnBJHv2x2qHFpT2pkmgfzAwZTE6Hv8auIPEuj3D7pI9jt3YfD9ql2lxYTAm2uYVLAFQ8XPyyCKhlrcINwbrtjwVlnu0eCKILLZzRFgrRs2PqD2+tXnh/TrTVQ1te3X+0Bf1GIDGeQQwIJ5Hc0DxHCltaC68mxcbwrHcWJ9uGGeMe9O8Ixyz3C3cEkMqrxIqP6l+anp+9Y4l5yZmp/AQASFshsqSNLawvrnREnje4e3ieGaZQBKi8HIzgEHP3HtSVb+IrKx1WONZrxrO5iYmKfG1kz1HPBBH8qSlGyNpdN8Dwa1I+qxXlnlTEyFe6tn69aPYShJPzQQCh2g4wQD8vnUu+9OnRqOF44HToKj2oHlZwPShx8OK7p1C8S3pdYQ1kx5giA2hsHcODn2GSO1CkLbkVlAOAoGxfUe/Tgfb/Gip/vox285Rj4YoEJImOCRw3T5mogDaKpXEjDLoAclF4YdCRx70gxGcZVk6JuPPX2OKmaeBJdkuAxEuAW5wOKhuqmdcgcg5468moECnblVnLPGoJ4Y8BvoAfhQ0kBbzEbJAHTdx8eanTAIF2AL6T047rUMMxkucseMY5qI9klsY2mjfZ+r9IeLIP8AM0WX8vaHBRWXG4nALe3FAhYybDISxOMluc8GhRkiKbBP6F/lUUq0O9jFydjqY5+zPx96o5UMblWABBx1rVliNKdwSGPcHnqKrLl2eU72LYyBk5xxUBTETq0VGDg1IjfFRTT46ta3cLCksaGTiupjVQqgCRjmmhhSNQ+9ArUBGE20g4z86VLhi+VwvyoDUi0FagpjSGQbmYlvdjR9MuZLW4E0ErRyKeHQ8ioa/pp9t1NWoHQrM6ahel6L4zjZBFq4IYDieNchvmoHB+X7V1YeHtSVkeHxONjRbM4xiWDLofqv/9k='},
      {id:2, name: 'Driven Palace', image:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR4Ve-__cISrPmd6zYoBnoCOFdXn4INGxdpgGy_QUuoHGC8DwsmJJncFSkKNMcJYP3vZvM&usqp=CAU'}
    ],
  });

  await prisma.room.createMany({
    data:[
      { name: "101", capacity: 1, hotelId: 1 },
      { name: "102", capacity: 1, hotelId: 1 },
      { name: "103", capacity: 1, hotelId: 1 },
      { name: "104", capacity: 1, hotelId: 1 },

      { name: "201", capacity: 2, hotelId: 1 },
      { name: "202", capacity: 2, hotelId: 1 },
      { name: "203", capacity: 2, hotelId: 1 },
      { name: "204", capacity: 2, hotelId: 1 },

      { name: "301", capacity: 3, hotelId: 1 },
      { name: "302", capacity: 3, hotelId: 1 },
      { name: "303", capacity: 3, hotelId: 1 },
      { name: "304", capacity: 3, hotelId: 1 },

      { name: "101", capacity: 1, hotelId: 2 },
      { name: "102", capacity: 1, hotelId: 2 },
      { name: "103", capacity: 1, hotelId: 2 },
      { name: "104", capacity: 1, hotelId: 2 },

      { name: "201", capacity: 2, hotelId: 2 },
      { name: "202", capacity: 2, hotelId: 2 },
      { name: "203", capacity: 2, hotelId: 2 },
      { name: "204", capacity: 2, hotelId: 2 },

      { name: "301", capacity: 3, hotelId: 2 },
      { name: "302", capacity: 3, hotelId: 2 },
      { name: "303", capacity: 3, hotelId: 2 },
      { name: "304", capacity: 3, hotelId: 2 },
    ]
  })

  console.log({ event });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
