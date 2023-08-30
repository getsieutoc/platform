import Form from '@/components/form';
import { getSession } from '@/lib/auth';
import { redirect } from 'next/navigation';
import { editUser } from '@/lib/actions';

export default async function ProfileSettingsPage() {
  const session = await getSession();

  if (!session) {
    redirect('/login');
  }
  return (
    <div className="flex max-w-screen-xl flex-col space-y-12 p-8">
      <div className="flex flex-col space-y-6">
        <h1 className="font-cal text-3xl font-bold dark:text-white">
          Profile Settings
        </h1>
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
    </div>
  );
}
