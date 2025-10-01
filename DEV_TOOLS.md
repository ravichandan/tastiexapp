# Tastiex mobile app

## Create a fresh EAS project (best if you’re rebranding)

If you want Expo to recognize your app as tastiex:

Remove the old projectId from your config:
`
extra: {
  eas: {
    projectId: undefined
  }
}
`

(or just delete the extra.eas.projectId block entirely)

Run:
`
eas init`


This will create a new EAS project for tastiex and update your config with the new projectId.

From then on, EAS will link builds to the new tastiex project.

## Deploy ipa to AppStore

 `xcrun altool --validate-app -f application-3212d305-223e-4a0d-a2bb-b7c15e3c723a.ipa -t platform -u neelima.salesha2000@gmail.com -p yuxu-dcve-ekyb-rnhk --output-format xml`