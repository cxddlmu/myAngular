import { storiesOf } from '@storybook/angular';
import { action } from '@storybook/addon-actions';
import { FatherComponent } from '../app/angular-core/father/father.component';
import { DaughterComponent } from '../app/angular-core/daughter/daughter.component';
import { SonComponent } from '../app/angular-core/son/son.component';
import { AngularCoreModule } from '../app/angular-core/angular-core.module';

storiesOf('My Button', module)
  .add('with some emoji', () => ({
    component: FatherComponent,
    moduleMetadata: {
        declarations: [DaughterComponent,SonComponent],
      },
    props: {
      age: 1,
    },
  }))
