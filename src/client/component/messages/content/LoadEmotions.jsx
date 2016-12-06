import React from 'react';
import styled from 'styled-components';
import _ from 'lodash';
import Message from '~/component/messages/Message';
import { NUMBER_OF_EMOTIONS } from '~/types';

const EMOTIONS_NAMES = [
  `/data/emotions/acceptance.em`,
  `/data/emotions/admiration.em`,
  `/data/emotions/adoration.em`,
  `/data/emotions/affection.em`,
  `/data/emotions/afraid.em`,
  `/data/emotions/agitation.em`,
  `/data/emotions/agreeable.em`,
  `/data/emotions/aggressive.em`,
  `/data/emotions/aggravation.em`,
  `/data/emotions/agony.em`,
  `/data/emotions/alarm.em`,
  `/data/emotions/alienation.em`,
  `/data/emotions/amazement.em`,
  `/data/emotions/amusement.em`,
  `/data/emotions/anger.em`,
  `/data/emotions/angry.em`,
  `/data/emotions/anguish.em`,
  `/data/emotions/annoyance.em`,
  `/data/emotions/anticipation.em`,
  `/data/emotions/anxiety.em`,
  `/data/emotions/apprehension.em`,
  `/data/emotions/assertive.em`,
  `/data/emotions/assured.em`,
  `/data/emotions/astonishment.em`,
  `/data/emotions/attachment.em`,
  `/data/emotions/attraction.em`,
  `/data/emotions/awe.em`,
  `/data/emotions/beleaguered.em`,
  `/data/emotions/bewitched.em`,
  `/data/emotions/bitterness.em`,
  `/data/emotions/bliss.em`,
  `/data/emotions/blue.em`,
  `/data/emotions/boredom.em`,
  `/data/emotions/calculating.em`,
  `/data/emotions/calm.em`,
  `/data/emotions/capricious.em`,
  `/data/emotions/caring.em`,
  `/data/emotions/cautious.em`,
  `/data/emotions/charmed.em`,
  `/data/emotions/cheerful.em`,
  `/data/emotions/closeness.em`,
  `/data/emotions/compassion.em`,
  `/data/emotions/complacent.em`,
  `/data/emotions/compliant.em`,
  `/data/emotions/composed.em`,
  `/data/emotions/contempt.em`,
  `/data/emotions/conceited.em`,
  `/data/emotions/concerned.em`,
  `/data/emotions/content.em`,
  `/data/emotions/contentment.em`,
  `/data/emotions/crabby.em`,
  `/data/emotions/crazed.em`,
  `/data/emotions/crazy.em`,
  `/data/emotions/cross.em`,
  `/data/emotions/cruel.em`,
  `/data/emotions/defeated.em`,
  `/data/emotions/defiance.em`,
  `/data/emotions/delighted.em`,
  `/data/emotions/dependence.em`,
  `/data/emotions/depressed.em`,
  `/data/emotions/desire.em`,
  `/data/emotions/disappointment.em`,
  `/data/emotions/disapproval.em`,
  `/data/emotions/discontent.em`,
  `/data/emotions/disenchanted.em`,
  `/data/emotions/disgust.em`,
  `/data/emotions/disillusioned.em`,
  `/data/emotions/dislike.em`,
  `/data/emotions/dismay.em`,
  `/data/emotions/displeasure.em`,
  `/data/emotions/dissatisfied.em`,
  `/data/emotions/distraction.em`,
  `/data/emotions/distress.em`,
  `/data/emotions/disturbed.em`,
  `/data/emotions/dread.em`,
  `/data/emotions/eager.em`,
  `/data/emotions/earnest.em`,
  `/data/emotions/easy-going.em`,
  `/data/emotions/ecstasy.em`,
  `/data/emotions/ecstatic.em`,
  `/data/emotions/elation.em`,
  `/data/emotions/embarrassment.em`,
  `/data/emotions/emotion.em`,
  `/data/emotions/emotional.em`,
  `/data/emotions/enamored.em`,
  `/data/emotions/enchanted.em`,
  `/data/emotions/enjoyment.em`,
  `/data/emotions/enraged.em`,
  `/data/emotions/enraptured.em`,
  `/data/emotions/enthralled.em`,
  `/data/emotions/enthusiasm.em`,
  `/data/emotions/envious.em`,
  `/data/emotions/envy.em`,
  `/data/emotions/equanimity.em`,
  `/data/emotions/euphoria.em`,
  `/data/emotions/exasperation.em`,
  `/data/emotions/excited.em`,
  `/data/emotions/exhausted.em`,
  `/data/emotions/extroverted.em`,
  `/data/emotions/exuberant.em`,
  `/data/emotions/fascinated.em`,
  `/data/emotions/fatalistic.em`,
  `/data/emotions/fear.em`,
  `/data/emotions/fearful.em`,
  `/data/emotions/ferocity.em`,
  `/data/emotions/flummoxed.em`,
  `/data/emotions/flustered.em`,
  `/data/emotions/fondness.em`,
  `/data/emotions/fright.em`,
  `/data/emotions/frightened.em`,
  `/data/emotions/frustration.em`,
  `/data/emotions/furious.em`,
  `/data/emotions/fury.em`,
  `/data/emotions/generous.em`,
  `/data/emotions/glad.em`,
  `/data/emotions/gloating.em`,
  `/data/emotions/gloomy.em`,
  `/data/emotions/glum.em`,
  `/data/emotions/greedy.em`,
  `/data/emotions/grief.em`,
  `/data/emotions/grim.em`,
  `/data/emotions/grouchy.em`,
  `/data/emotions/grumpy.em`,
  `/data/emotions/guilt.em`,
  `/data/emotions/happiness.em`,
  `/data/emotions/happy.em`,
  `/data/emotions/harried.em`,
  `/data/emotions/homesick.em`,
  `/data/emotions/hopeless.em`,
  `/data/emotions/horror.em`,
  `/data/emotions/hostility.em`,
  `/data/emotions/humiliation.em`,
  `/data/emotions/hurt.em`,
  `/data/emotions/hysteria.em`,
  `/data/emotions/infatuated.em`,
  `/data/emotions/insecurity.em`,
  `/data/emotions/insulted.em`,
  `/data/emotions/interested.em`,
  `/data/emotions/introverted.em`,
  `/data/emotions/irritation.em`,
  `/data/emotions/isolation.em`,
  `/data/emotions/jaded.em`,
  `/data/emotions/jealous.em`,
  `/data/emotions/jittery.em`,
  `/data/emotions/jolliness.em`,
  `/data/emotions/jolly.em`,
  `/data/emotions/joviality.em`,
  `/data/emotions/jubilation.em`,
  `/data/emotions/joy.em`,
  `/data/emotions/keen.em`,
  `/data/emotions/kind.em`,
  `/data/emotions/kindhearted.em`,
  `/data/emotions/kindly.em`,
  `/data/emotions/laid back.em`,
  `/data/emotions/lazy.em`,
  `/data/emotions/like.em`,
  `/data/emotions/liking.em`,
  `/data/emotions/loathing.em`,
  `/data/emotions/lonely.em`,
  `/data/emotions/longing.em`,
  `/data/emotions/loneliness.em`,
  `/data/emotions/love.em`,
  `/data/emotions/lulled.em`,
  `/data/emotions/lust.em`,
  `/data/emotions/mad.em`,
  `/data/emotions/merry.em`,
  `/data/emotions/misery.em`,
  `/data/emotions/modesty.em`,
  `/data/emotions/mortification.em`,
  `/data/emotions/naughty.em`,
  `/data/emotions/neediness.em`,
  `/data/emotions/neglected.em`,
  `/data/emotions/nervous.em`,
  `/data/emotions/nirvana.em`,
  `/data/emotions/open.em`,
  `/data/emotions/optimism.em`,
  `/data/emotions/ornery.em`,
  `/data/emotions/outgoing.em`,
  `/data/emotions/outrage.em`,
  `/data/emotions/panic.em`,
  `/data/emotions/passion.em`,
  `/data/emotions/passive.em`,
  `/data/emotions/peaceful.em`,
  `/data/emotions/pensive.em`,
  `/data/emotions/pessimism.em`,
  `/data/emotions/pity.em`,
  `/data/emotions/placid.em`,
  `/data/emotions/pleased.em`,
  `/data/emotions/pride.em`,
  `/data/emotions/proud.em`,
  `/data/emotions/pushy.em`,
  `/data/emotions/quarrelsome.em`,
  `/data/emotions/queasy.em`,
  `/data/emotions/querulous.em`,
  `/data/emotions/quick-witted.em`,
  `/data/emotions/quiet.em`,
  `/data/emotions/quirky.em`,
  `/data/emotions/rage.em`,
  `/data/emotions/rapture.em`,
  `/data/emotions/rejection.em`,
  `/data/emotions/relief.em`,
  `/data/emotions/relieved.em`,
  `/data/emotions/remorse.em`,
  `/data/emotions/repentance.em`,
  `/data/emotions/resentment.em`,
  `/data/emotions/resigned.em`,
  `/data/emotions/revulsion.em`,
  `/data/emotions/roused.em`,
  `/data/emotions/sad.em`,
  `/data/emotions/sadness.em`,
  `/data/emotions/sarcastic.em`,
  `/data/emotions/sardonic.em`,
  `/data/emotions/satisfaction.em`,
  `/data/emotions/scared.em`,
  `/data/emotions/scorn.em`,
  `/data/emotions/self-assured.em`,
  `/data/emotions/self-congratulatory.em`,
  `/data/emotions/self-satisfied.em`,
  `/data/emotions/sentimentality.em`,
  `/data/emotions/serenity.em`,
  `/data/emotions/shame.em`,
  `/data/emotions/shock.em`,
  `/data/emotions/smug.em`,
  `/data/emotions/sorrow.em`,
  `/data/emotions/sorry.em`,
  `/data/emotions/spellbound.em`,
  `/data/emotions/spite.em`,
  `/data/emotions/stingy.em`,
  `/data/emotions/stoical.em`,
  `/data/emotions/stressed.em`,
  `/data/emotions/subdued.em`,
  `/data/emotions/submission.em`,
  `/data/emotions/suffering.em`,
  `/data/emotions/surprise.em`,
  `/data/emotions/sympathy.em`,
  `/data/emotions/tenderness.em`,
  `/data/emotions/tense.em`,
  `/data/emotions/terror.em`,
  `/data/emotions/threatening.em`,
  `/data/emotions/thrill.em`,
  `/data/emotions/timidity.em`,
  `/data/emotions/torment.em`,
  `/data/emotions/tranquil.em`,
  `/data/emotions/triumphant.em`,
  `/data/emotions/trust.em`,
  `/data/emotions/uncomfortable.em`,
  `/data/emotions/unhappiness.em`,
  `/data/emotions/unhappy.em`,
  `/data/emotions/upset.em`,
  `/data/emotions/vain.em`,
  `/data/emotions/vanity.em`,
  `/data/emotions/venal.em`,
  `/data/emotions/vengeful.em`,
  `/data/emotions/vexed.em`,
  `/data/emotions/vigilance.em`,
  `/data/emotions/vivacious.em`,
  `/data/emotions/wary.em`,
  `/data/emotions/watchfulness.em`,
  `/data/emotions/weariness.em`,
  `/data/emotions/weary.em`,
  `/data/emotions/woe.em`,
  `/data/emotions/wonder.em`,
  `/data/emotions/worried.em`,
  `/data/emotions/wrathful.em`,
  `/data/emotions/zeal.em`,
  `/data/emotions/zest.em`
];

const Text = styled.p`
  font-family: 'Anonymous Pro',
   monospace;
  font-size: 14px;
  padding-left: 20px;
`;

const MissingEmotion = styled.p`
  font-size: 14px;
  padding-left: 20px;
  color: #F44336;
  padding-top: 3px;
`;

const MissingEmotionDetail = styled.p`
  font-family: 'Anonymous Pro', monospace;
  font-size: 10px;
  padding-left: 30px;
  color: #F44336;
`;

const LoadEmotions = (props) => {
  const { msg } = props;
  const progress = msg.progress / NUMBER_OF_EMOTIONS;
  const emoIndex = msg.progress % EMOTIONS_NAMES.length;
  const emo = EMOTIONS_NAMES[emoIndex];
  return (
    <Message msg={msg} progress={progress} title='Loading emotions'>
      <Text>
        { (() => {
          if (progress < 1) {
            return emo;
          } else {
            return `All emotions loaded`;
          }
        })() }
      </Text>
      { (() => {
        if (msg.progress > 10) {
          return (
            <div>
              <MissingEmotion>Emotion file for <b>Love</b> is missing :</MissingEmotion>
              <MissingEmotionDetail>/data/emotions/love.em</MissingEmotionDetail>
            </div>
          );
        }
      })() }
      { (() => {
        if (msg.progress > 21) {
          return (
            <div>
              <MissingEmotion>Emotion file for <b>Anger</b> is missing :</MissingEmotion>
              <MissingEmotionDetail>/data/emotions/anger.em</MissingEmotionDetail>
            </div>
          );
        }
      })() }
      { (() => {
        if (msg.progress > 37) {
          return (
            <div>
              <MissingEmotion>Emotion file for <b>Sadness</b> is missing :</MissingEmotion>
              <MissingEmotionDetail>/data/emotions/sadness.em</MissingEmotionDetail>
            </div>
          );
        }
      })() }
    </Message>
  )
};

export default LoadEmotions;
