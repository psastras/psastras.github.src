module SharedStyles exposing (..)

import Html.CssHelpers exposing (withNamespace)


type CssClasses
    = Nav
    | NavAvatar
    | Container
    | Page
    | PageContainer
    | PageHeader
    | PageHeaderMini
    | PageContent
    | PageHeaderText
    | PageContentText
    | PageHeaderAvatar
    | PageHeaderRow


mainNamespace : Html.CssHelpers.Namespace String class id msg
mainNamespace =
    withNamespace "main"


navNamespace : Html.CssHelpers.Namespace String class id msg
navNamespace =
    withNamespace "nav"
