// import React from 'react';
// import { useWallet } from '@solana/wallet-adapter-react';

// function ConnectedButton() {
//   const { publicKey, connected, wallet, disconnect, disconnecting } =
//     useWallet();

//   if (!publicKey || !connected || !wallet) {
//     return null;
//   }

//   return (
//     <Dropdown
//       showArrow
//       radius="sm"
//       classNames={{
//         base: 'before:bg-default-200', // change arrow background
//         content: 'p-0 border-small border-divider bg-background',
//       }}
//     >
//       <DropdownTrigger>
//         <Button
//           isLoading={disconnecting}
//           disableRipple
//           color="default"
//           variant="bordered"
//           startContent={
//             <Image
//               src={wallet.adapter.icon}
//               alt="icon"
//               width={20}
//               height={20}
//             />
//           }
//         >
//           {(publicKey?.toBase58()?.slice(0, 5) || '') +
//             '...' +
//             (publicKey?.toBase58()?.slice(-5) || '')}
//         </Button>
//       </DropdownTrigger>
//       <DropdownMenu
//         aria-label="Connect menu"
//         className="p-3"
//         itemClasses={{
//           base: [
//             'rounded-md',
//             'text-default-500',
//             'transition-opacity',
//             'data-[hover=true]:text-foreground',
//             'data-[hover=true]:bg-default-100',
//             'dark:data-[hover=true]:bg-default-50',
//             'data-[selectable=true]:focus:bg-default-50',
//             'data-[pressed=true]:opacity-70',
//             'data-[focus-visible=true]:ring-default-500',
//           ],
//         }}
//       >
//         <DropdownItem key="disconnect" onClick={disconnect}>
//           Disconnect
//         </DropdownItem>
//       </DropdownMenu>
//     </Dropdown>
//   );
// }

// export default ConnectedButton;
