import ClientHome from '@/app/ClientHome';
import { ClientEmbed } from '@/components';
import { isClientMode } from '@/app/resources/runtimeConfig';
export { generateMetadata } from './metadata';

export default function HomePage() {
  // NEXT_PUBLIC_CLIENT_MODE=true builds the stripped deliverable shipped to clients.
  return isClientMode ? <ClientEmbed /> : <ClientHome />;
}
