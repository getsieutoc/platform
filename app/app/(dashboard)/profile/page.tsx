import Form from '@/components/form';
import { getSession } from '@/lib/auth';
import { redirect } from 'next/navigation';
import { editUser } from '@/lib/actions';
import { Flex, Heading } from '@/components';

export default async function ProfileSettingsPage() {
  const session = await getSession();

  if (!session) {
    redirect('/login');
  }
  return (
    <Flex width="100%" direction="column" gap={6}>
      <Flex height="48px" align="center">
        <Heading as="h1" size="lg">
          Profile Settings
        </Heading>
      </Flex>

      <div className="flex flex-col space-y-6">
        <Form
          title="Name"
          description="Your name on this app."
          helpText="Please use 32 characters maximum."
          inputAttrs={{
            name: 'name',
            type: 'text',
            defaultValue: session.user.name!,
            placeholder: 'Your Name',
            maxLength: 32,
          }}
          handleSubmit={editUser}
        />
        <Form
          title="Email"
          description="Your email on this app."
          helpText="Please enter a valid email."
          inputAttrs={{
            name: 'email',
            type: 'email',
            defaultValue: session.user.email!,
            placeholder: 'your@email.com',
          }}
          handleSubmit={editUser}
        />
      </div>
    </Flex>
  );
}
