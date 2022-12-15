// import React from "react";
import { Link } from "react-router-dom";
import "../LandingPage/LandingPage.css";
//import logo from "../img/fondop.gif"
//import { Link, Container, Heading, Flex, Box, Image } from '@chakra-ui/react'

export default function LandingPage() {
  return (
    <div className="container">
      <h1 className="welcome">Welcome to Dog World</h1>

      <Link to="/home">
        <img
          className="footprint"
          src="https://us.123rf.com/450wm/ahasoft2000/ahasoft20001801/ahasoft2000180101464/92879719-icono-de-moneda-de-perro-paso-de-bronce-el-estilo-del-vector-es-un-s%C3%ADmbolo-de-moneda-plana-de-cobre-.jpg?ver=6"
          alt="bone"
          width="100px"
          height="100px"
        />
      </Link>
    </div>
//     <>
//     <Heading fontFamily={"Dancing Script"} fontSize="6xl" >Welcome to Dog World</Heading>
//     <Image 
//     src="https://c4.wallpaperflare.com/wallpaper/632/226/393/dog-backgrounds-for-desktop-hd-backgrounds-wallpaper-preview.jpg"
//     // backgroundRepeat="no-repeat"
//     //  pos="absolute"
//      w="100vw"
//      h='85vh'
//     />
//         </>
  );
}
// import React from 'react'
// import {
//   Stack,
//   Flex,
//   Button,
//   Text,
//   VStack,
//   useBreakpointValue,
//   Link
// } from '@chakra-ui/react';

// export default function WithBackgroundImage() {
//   return (
//     <Flex
//       w={'full'}
//       h={'100vh'}
//       backgroundImage={
//         'url(https://images.unsplash.com/photo-1600267175161-cfaa711b4a81?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80)'
//       }
//       backgroundSize={'cover'}
//       backgroundPosition={'center center'}>
//       <VStack
//         w={'full'}
//         justify={'center'}
//         px={useBreakpointValue({ base: 4, md: 8 })}
//         bgGradient={'linear(to-r, blackAlpha.600, transparent)'}>
//         <Stack maxW={'2xl'} align={'flex-start'} spacing={6}>
//           <Text
//             color={'white'}
//             fontWeight={700}
//             lineHeight={1.2}
//             fontSize={useBreakpointValue({ base: '3xl', md: '4xl' })}>
//             Lorem ipsum dolor sit amet consectetur adipiscing elit sed do
//             eiusmod tempor
//           </Text>
//           <Stack direction={'row'}>
//             <Button
//               bg={'blue.400'}
//               rounded={'full'}
//               color={'white'}
//               _hover={{ bg: 'blue.500' }}>
//               Show me more
//             </Button>
//             <Button
//               bg={'whiteAlpha.300'}
//               rounded={'full'}
//               color={'white'}
//               _hover={{ bg: 'whiteAlpha.500' }}>
//               Show me more
//             </Button>
//           </Stack>
//              <Link to="/home">
//          <Image
//            src="https://us.123rf.com/450wm/ahasoft2000/ahasoft20001801/ahasoft2000180101464/92879719-icono-de-moneda-de-perro-paso-de-bronce-el-estilo-del-vector-es-un-s%C3%ADmbolo-de-moneda-plana-de-cobre-.jpg?ver=6"
//            alt="bone"
//            width="100px"
//            height="100px"
//          />
//        </Link>
//         </Stack>
//       </VStack>
//     </Flex>
//   );
// }
