export function getArCalls(game_id) {
  return [
    {
      id: "vlca",
      options: {
        dedalo_get: "records",
        table: "game",
        ar_fields: [
          "section_id",
          "type_data",
          "title",
          "children_data",
          "identifying_image",
          "images_data",
        ],
        section_id: game_id,
        lang: "lg-vlca",
        resolve_portal: true,
        resolve_portals_custom: {
          children_data: "game",
          "children_data.children_data": "game",
          images_data: "image",
        },
      },
    },
    {
      id: "spa",
      options: {
        dedalo_get: "records",
        table: "game",
        ar_fields: [
          "section_id",
          "type_data",
          "title",
          "children_data",
          "identifying_image",
          "images_data",
        ],
        section_id: game_id,
        lang: "lg-spa",
        resolve_portal: true,
        resolve_portals_custom: {
          children_data: "game",
          "children_data.children_data": "game",
          images_data: "image",
        },
      },
    },
  ];
}
