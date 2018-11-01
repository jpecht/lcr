import { expect } from 'chai';
import { shallowMount } from '@vue/test-utils';
import DiceArea from '@/components/DiceArea.vue';

describe('DiceArea.vue', () => {
  it('renders props.msg when passed', () => {
    const msg = 'new message';
    const wrapper = shallowMount(DiceArea, {
      propsData: { msg },
    });
    expect(wrapper.text()).to.include(msg);
  });
});
