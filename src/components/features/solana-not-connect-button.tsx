// 'use client';

// import React from 'react';
// import {
//   Accordion,
//   AccordionItem,
//   Button,
//   Chip,
//   Divider,
//   Image,
//   Modal,
//   ModalBody,
//   ModalContent,
//   ModalFooter,
//   ModalHeader,
//   useDisclosure,
// } from '@nextui-org/react';
// import { WalletReadyState } from '@solana/wallet-adapter-base';
// import { useWallet } from '@solana/wallet-adapter-react';

// function NotConnectButton() {
//   const { isOpen, onOpen, onClose } = useDisclosure();
//   const { wallets, select, connecting } = useWallet();

//   if (connecting) {
//     return (
//       <Button color="primary" variant="flat" isLoading={true}>
//         Connecting
//       </Button>
//     );
//   }

//   return (
//     <>
//       <Button color="primary" variant="flat" onClick={onOpen}>
//         Connect to wallet
//       </Button>
//       <Modal backdrop="blur" isOpen={isOpen} onClose={onClose}>
//         <ModalContent>
//           {(onClose) => (
//             <>
//               <ModalHeader className="flex flex-col gap-1">
//                 Connect to wallet
//               </ModalHeader>
//               <ModalBody>
//                 <div className="flex flex-col">
//                   {wallets
//                     .filter((wl) => ['Phantom'].includes(wl.adapter.name))
//                     .map((wl) => {
//                       return (
//                         <button
//                           className="hover:bg-kyu-color-2 py-2 px-2"
//                           key={wl.adapter.name}
//                           onClick={async () => {
//                             try {
//                               select(wl.adapter.name);
//                             } catch (e) {
//                               console.error(e);
//                             } finally {
//                               onClose();
//                             }
//                           }}
//                         >
//                           <div className="flex gap-2 justify-between items-center flex-wrap">
//                             <div className="flex items-center gap-3">
//                               <div className="min-w-9">
//                                 <Image
//                                   src={wl.adapter.icon}
//                                   alt={wl.adapter.name}
//                                   height={32}
//                                   width={32}
//                                 />
//                               </div>
//                               {wl.adapter.name}
//                             </div>

//                             <div className="flex gap-4">
//                               <Chip color="success">Recommended</Chip>

//                               <div className="hidden sm:block">
//                                 {wl.readyState ===
//                                 WalletReadyState.Installed ? (
//                                   wl.adapter.connected ? (
//                                     <Chip color="success" variant="light">
//                                       Connected
//                                     </Chip>
//                                   ) : (
//                                     <Chip color="warning" variant="light">
//                                       Detected
//                                     </Chip>
//                                   )
//                                 ) : (
//                                   <Chip color="danger" variant="light">
//                                     Not Installed
//                                   </Chip>
//                                 )}
//                               </div>
//                             </div>
//                           </div>
//                         </button>
//                       );
//                     })}

//                   <Divider className="mt-4" />

//                   <Accordion>
//                     <AccordionItem
//                       key="other-wallets"
//                       aria-label="Other Wallets"
//                       title={
//                         <div className="flex justify-between">
//                           <div>Other Wallets</div>
//                           <div className="flex gap-1">
//                             {wallets
//                               .filter(
//                                 (wl) => !['Phantom'].includes(wl.adapter.name),
//                               )
//                               .slice(0, 3)
//                               ?.map((icon) => (
//                                 <Image
//                                   key={icon.adapter.name}
//                                   src={icon.adapter.icon}
//                                   width={24}
//                                   height={24}
//                                   alt={icon.adapter.name}
//                                 />
//                               ))}
//                           </div>
//                         </div>
//                       }
//                     >
//                       {wallets
//                         .filter((wl) => !['Phantom'].includes(wl.adapter.name))
//                         .map((wl) => {
//                           return (
//                             <button
//                               className="w-full py-2 px-2"
//                               key={wl.adapter.name}
//                               onClick={async () => {
//                                 try {
//                                   select(wl.adapter.name);
//                                 } catch (e) {
//                                   console.error(e);
//                                 } finally {
//                                   onClose();
//                                 }
//                               }}
//                             >
//                               <div className="flex gap-2 justify-between items-center flex-wrap">
//                                 <div className="flex items-center gap-3">
//                                   <div className="min-w-9">
//                                     <Image
//                                       src={wl.adapter.icon}
//                                       alt={wl.adapter.name}
//                                       height={32}
//                                       width={32}
//                                     />
//                                   </div>
//                                   {wl.adapter.name}
//                                 </div>
//                                 {wl.readyState ===
//                                 WalletReadyState.Installed ? (
//                                   wl.adapter.connected ? (
//                                     <Chip color="success" variant="light">
//                                       Connected
//                                     </Chip>
//                                   ) : (
//                                     <Chip color="warning" variant="light">
//                                       Detected
//                                     </Chip>
//                                   )
//                                 ) : (
//                                   <Chip color="danger" variant="light">
//                                     Not Installed
//                                   </Chip>
//                                 )}
//                               </div>
//                             </button>
//                           );
//                         })}
//                     </AccordionItem>
//                   </Accordion>
//                 </div>
//               </ModalBody>
//               <ModalFooter></ModalFooter>
//             </>
//           )}
//         </ModalContent>
//       </Modal>
//     </>
//   );
// }

// export default NotConnectButton;
