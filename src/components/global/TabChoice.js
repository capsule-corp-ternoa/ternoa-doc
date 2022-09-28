import React from 'react'
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

// Insert TS config

const TabChoice = ( {npmconsole, yarnconsole}) => {
  return (
    <Tabs
      defaultValue='npm'
      values={[
        {label: 'npm', value: 'npm'}, 
        {label: 'yarn', value:'yarn'}
      ]}>
        <TabItem value='npm'>{npmconsole}</TabItem>
        <TabItem value='yarn'>{yarnconsole}</TabItem>
    </Tabs>

  )
}

export default TabChoice
