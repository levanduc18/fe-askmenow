'use client';

import { WithAuth } from '@/components/guards/WithAuth';
import { Button } from '@/components/ui/button';

export default function Home() {
  return (
    <WithAuth>
      <div>
        <Button>Hello</Button>
      </div>
    </WithAuth>
  );
}
