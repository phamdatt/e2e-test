import { defineConfig } from 'cypress'
import fs from 'fs'

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      on(
        'after:spec',
        (spec, results) => {
          if (results && results.video) {
            // Do we have failures for any retry attempts?
            const failures = results.tests.some((test) =>
              test.attempts.some((attempt) => attempt.state === 'failed')
            )
            if (!failures) {
              // delete the video if the spec passed and no tests retried
              fs.unlinkSync(results.video)
            }
          }
        }
      )
    },
  },
  defaultCommandTimeout: 5000,
  viewportWidth: 1280,
  viewportHeight: 720,
  screenshotOnRunFailure: true,
  video: true,
  videoCompression: false
})
