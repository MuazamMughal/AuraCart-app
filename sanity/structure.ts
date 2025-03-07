import type {StructureResolver} from 'sanity/structure'


// So here we have to modify structure of full sanity studio as what we want 



// https://www.sanity.io/docs/structure-builder-cheat-sheet
export const structure: StructureResolver = (S) =>
  S.list()
    .title('AuraCart')
    .items([
     
      S.documentTypeListItem('category').title('Categories'),
       S.divider(),
      
     
      ...S.documentTypeListItems().filter(
        (item) => item.getId() && ![ 'category', 'author'].includes(item.getId()!),
      ),
    ])
