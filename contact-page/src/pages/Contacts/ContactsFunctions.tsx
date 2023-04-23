import { useEffect, useState } from 'react';
import { Contact } from '../../Models/Contacts';

interface IListContactsCategoryGroup {
	[x: string]: Contact[];
}

interface IContactsFunctionsProps {
	contactsList: Contact[];
}

const ContactsFunctions = (props: IContactsFunctionsProps) => {
	let { contactsList } = props;
	const [list, setList] = useState<IListContactsCategoryGroup>({} as IListContactsCategoryGroup);
	const [filter, setFilter] = useState<string>('');

	useEffect(() => {
		setList(groupByCategory(orderByName(contactsList)));
	}, [contactsList]);

	const orderByName = (array: any[]) => {
		return array?.sort((a, b) => {
			const nameA = a.name.toUpperCase();
			const nameB = b.name.toUpperCase();

			if (nameA < nameB) {
				return -1;
			}
			if (nameA > nameB) {
				return 1;
			}
			return 0;
		});
	};

	const groupByCategory = (array: any[]) => {
		return array.reduce((result, item) => {
			const category = item.category;
			if (!result[category]) {
				result[category] = [];
			}
			result[category].push(item);
			return result;
		}, {});
	};

	const contactAdd = () => {
		const contact = {} as Contact;
		contact.name = window.prompt('Nome do contato: ') as string;
		contact.number = window.prompt('Número do contato: ') as string;
		contact.image = window.prompt('Imagem do contato: ') as string;
		contact.category = contact?.name[0]?.toUpperCase();
		contactsList.push(contact);
		setList(groupByCategory(orderByName(contactsList)));
	};
	const contactEdit = () => {
		const contact = {} as Contact;
		contact.name = window.prompt('Pesquisar contato pelo nome: ') as string;
		const contactFounded = contactsList.findIndex((a) => contact.name.toUpperCase() === a.name.toUpperCase());

		if (contactFounded !== -1) {
			contactsList[contactFounded].name = window.prompt('Nome do contato: ', contactsList[contactFounded].name) as string;
			contactsList[contactFounded].number = window.prompt('Número do contato: ', contactsList[contactFounded].number) as string;
			contactsList[contactFounded].image = window.prompt('Imagem do contato: ', contactsList[contactFounded].image) as string;
			contactsList[contactFounded].category = contactsList[contactFounded]?.name[0]?.toUpperCase() ?? 'A';
			setList(groupByCategory(orderByName(contactsList)));
		}
	};
	const contactDelete = () => {
		const contact = {} as Contact;
		contact.name = window.prompt('Digite o nome do contato a ser deletadp: ') as string;
		contactsList = contactsList.filter((x) => !(x?.name === contact?.name));
		setList(groupByCategory(orderByName(contactsList)));
	};

	const filterList = filter.length > 0 ? groupByCategory(orderByName(contactsList.filter((x) => x.name.includes(filter)))) : [];

	return { list, contactAdd, contactEdit, contactDelete, setFilter, filter, setList, filterList };
};

export { ContactsFunctions };
export type { IListContactsCategoryGroup, IContactsFunctionsProps };
