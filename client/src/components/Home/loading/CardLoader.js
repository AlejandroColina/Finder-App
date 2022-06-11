import React from 'react'
import ContentLoader from 'react-content-loader'

const ProfileCard = props => {
  return (
    <ContentLoader
      speed={1}
      width={450}
      height={400}
      viewBox="0 0 450 400"
      backgroundColor="#1583f1fd"
      foregroundColor="#030a4e"
      {...props}
      
    >
      <rect x="172" y="53" rx="0" ry="0" width="2" height="300" />
      <rect x="386" y="55" rx="0" ry="0" width="2" height="300" />
      <rect x="171" y="53" rx="0" ry="0" width="216" height="2" />
      <rect x="171" y="353" rx="0" ry="0" width="216" height="2" />
      <circle cx="277" cy="147" r="44" />
      <rect x="174" y="53" rx="0" ry="0" width="216" height="41" />
      <rect x="198" y="207" rx="0" ry="0" width="160" height="9" />
      <rect x="231" y="236" rx="0" ry="0" width="92" height="9" />
      <rect x="206" y="324" rx="0" ry="0" width="146" height="51" />

    </ContentLoader>
  )
}

{/* Paginado
 <circle cx="286" cy="536" r="12" />
<circle cx="319" cy="535" r="12" />
<circle cx="353" cy="535" r="12" />
<rect x="378" y="524" rx="0" ry="0" width="52" height="24" />
<rect x="210" y="523" rx="0" ry="0" width="52" height="24" />
<circle cx="210" cy="535" r="12" />
<circle cx="428" cy="536" r="12" /> */}

export default ProfileCard