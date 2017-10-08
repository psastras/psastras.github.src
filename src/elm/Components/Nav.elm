module Components.Nav exposing (nav)

import SharedStyles exposing (..)
import Html exposing (..)
import Html.Attributes exposing (..)
import Routing exposing (..)
import MD5


{ id, class, classList } =
    navNamespace


gravatarUrl : String
gravatarUrl =
    "https://www.gravatar.com/avatar/" ++ MD5.hex "psastras@gmail.com"


nav : Route -> Html msg
nav route =
    Html.nav [ class [ Nav ] ]
        [ img [ class [ NavAvatar ], src gravatarUrl ] []
        , maybeLink (route == HomeRoute) "#" (i [ Html.Attributes.class "fa fa-home" ] [])
        , maybeLink (route == CodeRoute) "#code" (i [ Html.Attributes.class "fa fa-info-circle" ] [])
        , maybeLink False "https://github.com/psastras" (i [ Html.Attributes.class "fa fa-github" ] [])
        , maybeLink False "https://www.linkedin.com/in/paul-sastrasinh-82480153/" (i [ Html.Attributes.class "fa fa-linkedin-square" ] [])
        , maybeLink False "https://www.instagram.com/psastras/" (i [ Html.Attributes.class "fa fa-instagram" ] [])
        ]


maybeLink : Bool -> String -> Html msg -> Html msg
maybeLink link url markup =
    if not link then
        a [ href url ] [ markup ]
    else
        markup
