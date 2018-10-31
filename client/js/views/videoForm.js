const html = require('choo/html')

module.exports = (sites, emit) => {
  return html`
        <article class="pa4 black-80">
        <form onsubmit=${e => {
          e.preventDefault()
          e.stopPropagation()
          emit('set:streamkey', Array.from(new FormData(e.target).values()))
          return false
        }} action="sign-up_submit" method="get" accept-charset="utf-8">
          <fieldset id="sign_up" class="ba b--transparent ph0 mh0">
            <legend class="ph0 mh0 fw6 clip">Sign Up</legend>
            <div class="mt3">
              <label class="db fw4 lh-copy f6" for="email-address">stream key</label>
              <input class="pa2 input-reset ba bg-transparent w-100 measure" type="text" name="email-address"  id="email-address">
            </div>
          </fieldset>
          <div class="mt3"><input class="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6" type="submit" value="submit"></div>
        </form>
      </article>

      `
}
