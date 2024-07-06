import { mount } from '@vue/test-utils'
<<<<<<< HEAD
import Tab1Page from '@/views/Tab1Page.vue'

describe('Tab1Page.vue', () => {
  it('renders tab 1 Tab1Page', () => {
    const wrapper = mount(Tab1Page)
    expect(wrapper.text()).toMatch('Tab 1 page')
=======
import HomePage from '@/views/HomePage.vue'
import { describe, expect, test } from 'vitest'

describe('HomePage.vue', () => {
  test('renders home vue', () => {
    const wrapper = mount(HomePage)
    expect(wrapper.text()).toMatch('Ready to create an app?')
>>>>>>> b35fc98 (Initial commit)
  })
})
