import billingType from './billing/billing';
import bulletType from './bullets/bullets';
import buttonType from './button/submit';
import captchaType from './captcha/captcha';
import multipleChoiceType from './checkbox/multiplechoice';
import sectionColumn1 from './column/column-1';
import sectionColumn2 from './column/column-2';
import sectionColumn3 from './column/column-3';
import sectionColumn4 from './column/column-4';
import sectionColumn5 from './column/column-5';
import sectionColumn6 from './column/column-6';
import sectionColumnLeft from './column/column-left';
import sectionColumnRight from './column/column-right';
import countdown from './countdwon/countdwon';
import datePickerType from './datepicker/datepicker';
import dividerType from './divider/divider';
import dropDownType from './dropdown/dropdown';
import emailType from './email/email';
import fullNameType from './fullname/fullname';
import headingType from './heading/heading';
import Imageupload from './Image/Imageupload';
import { fillableElement } from './membership/fillable';
import membershipType from './membership/membership';
import { mergeElement } from './membership/merge';
import memberProductType from './membership/product';
import numberType from './number/number';
import paragraphType from './paragraph/paragraph';
import phoneType from './phone/phone';
import productListType from './product-list/product-list';
import scaleRatingType from './scale-rating/scale-rating';
import sectionCollapseType from './section-collapse/section-collapse';
import sectionFullWidth from './section-collapse/section-full-width';
import sectionMedium from './section-collapse/section-medium';
import sectionSmall from './section-collapse/section-small';
import sectionWide from './section-collapse/section-wide';
import shortTextType from './short-text/short-text';
import signatureType from './signature/signature';
import singleChoiceType from './singlechoice/singlechoice';
import spinnerType from './spinner/spinner';
import starRatingType from './star-rating/star-rating';
import stripeType from './stripe/stripe';
import Textarea from './textaera/Textarea';
import Video from './video/video';

//** FORM TYPES */
export const formBuilderPlugin = (editor) => {
  //Sections
  editor.DomComponents.addType('section-wide', sectionWide);
  editor.DomComponents.addType('section-full-width', sectionFullWidth);
  editor.DomComponents.addType('section-medium', sectionMedium);
  editor.DomComponents.addType('section-small', sectionSmall);

  //Columns
  editor.DomComponents.addType('column-1', sectionColumn1);
  editor.DomComponents.addType('column-2', sectionColumn2);
  editor.DomComponents.addType('column-3', sectionColumn3);
  editor.DomComponents.addType('column-4', sectionColumn4);
  editor.DomComponents.addType('column-5', sectionColumn5);
  editor.DomComponents.addType('column-6', sectionColumn6);
  editor.DomComponents.addType('column-left', sectionColumnLeft);
  editor.DomComponents.addType('column-right', sectionColumnRight);

  //Teaxts & Headings
  editor.DomComponents.addType('heading', headingType);
  editor.DomComponents.addType('full-name', fullNameType);
  editor.DomComponents.addType('email', emailType);
  editor.DomComponents.addType('phone', phoneType);
  editor.DomComponents.addType('date-picker', datePickerType);

  //Basic Elements
  editor.DomComponents.addType('short-text', shortTextType);
  editor.DomComponents.addType('long-text', Textarea);
  editor.DomComponents.addType('paragraph', paragraphType);
  editor.DomComponents.addType('select', dropDownType);
  editor.DomComponents.addType('single-choice', singleChoiceType);
  editor.DomComponents.addType('checkbox', multipleChoiceType);
  editor.DomComponents.addType('number', numberType);

  //Other types
  editor.DomComponents.addType('short-video', Video);
  editor.DomComponents.addType('short-image', Imageupload);
  editor.DomComponents.addType('count-down', countdown);
  editor.DomComponents.addType('captcha', captchaType);
  editor.DomComponents.addType('spinner', spinnerType);
  editor.DomComponents.addType('submit', buttonType);
  editor.DomComponents.addType('signature', signatureType);
  editor.DomComponents.addType('product-list', productListType);
  editor.DomComponents.addType('scale-rating', scaleRatingType);

  //Survey elements
  editor.DomComponents.addType('bullet', bulletType);
  editor.DomComponents.addType('billing', billingType);
  editor.DomComponents.addType('star-rating', starRatingType);

  //Page Elements
  editor.DomComponents.addType('divider', dividerType);
  editor.DomComponents.addType('section-collapse', sectionCollapseType);

  //Payments
  editor.DomComponents.addType('stripe', stripeType);

  //Membership
  editor.DomComponents.addType('product', memberProductType);
  editor.DomComponents.addType('membership', membershipType);

  //Contact block
  editor.DomComponents.addType(
    'merge_first_name',
    new mergeElement('First Name', 'first_name', 'text')
  );
  editor.DomComponents.addType(
    'merge_last_name',
    new mergeElement('Last Name', 'last_name', 'text')
  );
  editor.DomComponents.addType(
    'merge_address',
    new mergeElement('Address', 'address', 'text')
  );
  editor.DomComponents.addType('merge_city', new mergeElement('City', 'city', 'text'));
  editor.DomComponents.addType(
    'merge_state',
    new mergeElement('State', 'state', 'text')
  );
  editor.DomComponents.addType('merge_zip', new mergeElement('Zip', 'zip', 'number'));
  editor.DomComponents.addType(
    'merge_phone',
    new mergeElement('Phone', 'phone', 'tel')
  );
  editor.DomComponents.addType(
    'merge_email',
    new mergeElement('Email', 'email', 'email')
  );
  //Membership block
  editor.DomComponents.addType(
    'membership_start_date',
    new mergeElement('Start Date', 'start_date', 'date')
  );
  editor.DomComponents.addType(
    'membership_end_date',
    new mergeElement('End Date', 'end_date', 'date')
  );
  editor.DomComponents.addType(
    'membership_type',
    new mergeElement('Type', 'type', 'select')
  );
  editor.DomComponents.addType(
    'membership_due',
    new mergeElement('Due', 'due', 'select')
  );
  editor.DomComponents.addType(
    'membership_total',
    new mergeElement('Total', 'total', 'number')
  );
  editor.DomComponents.addType(
    'membership_down_pay',
    new mergeElement('Down Pay', 'down_pay', 'number')
  );
  editor.DomComponents.addType(
    'membership_reg_fee',
    new mergeElement('Reg.Fee', 'reg_fee', 'number')
  );

  //fullText
  let fullText =
    'Lorem ipsum dolor sit {firstname}, consectetur adipiscing elit. Suspendisse cursus, turpis sit amet cursus pulvinar, tellus est efficitur diam, ut varius turpis leo sed odio. Nullam tristique, justo laoreet egestas elementum, ipsum sapien vulputate metus, nec ultrices ante lectus efficitur tellus. Maecenas tincidunt orci sed est malesuada euismod. Nunc ultricies consectetur massa nec semper. Phasellus feugiat id nisl in vulputate. Pellentesque id malesuada tellus. Maecenas et tellus sagittis lectus pharetra sagittis. Curabitur vitae condimentum quam. Cras efficitur libero eget facilisis scelerisque. Fusce tempor ipsum sit amet eros volutpat interdum et sit amet erat. Aliquam erat volutpat. Vivamus convallis nibh finibus sollicitudin rutrum. Nulla sapien purus, iaculis ut varius et, varius ut nibh. Sed convallis ipsum ligula, sit amet gravida arcu accumsan id.\n' +
    '\n' +
    'Nullam suscipit sem tellus, auctor porttitor tortor molestie sit amet. Integer mattis sit amet magna vel bibendum. Nunc ac dolor vitae ex fermentum consequat. Nam interdum a odio a interdum. Cras commodo, diam feugiat auctor varius, ipsum felis aliquet mi, id porta purus orci sed nisi. Sed id turpis sapien. In pulvinar lorem sed urna blandit fermentum. Duis mattis consectetur accumsan. Vivamus consequat bibendum maximus. Duis vel venenatis ligula, at euismod metus. Maecenas semper, nisi non fringilla ullamcorper, neque diam molestie dui, quis finibus quam sapien id lacus. Aenean sapien sem, pretium id dignissim eu, ullamcorper eu est. Suspendisse eget libero nec est porta sollicitudin vel et arcu.';
  editor.DomComponents.addType(
    'mym_text_box',
    new fillableElement(fullText, 'text_box', 'text')
  );
};
