import { themr } from 'react-css-themr';
import {IDENTIFIERS} from 'constants';
import AccordionContainer from './Accordion';
import AccordionItem from './AccordionItem';
import AccordionItemContent from './AccordionItemContent';
import AccordionItemTitle from './AccordionItemTitle';
import theme from './theme.scss';


const ThemedAccordion = themr(IDENTIFIERS.ACCORDION, theme)(AccordionContainer);
export {
    ThemedAccordion as Accordion,
    AccordionItem,
    AccordionItemTitle as AccordionTitle,
    AccordionItemContent as AccordionContent
};
